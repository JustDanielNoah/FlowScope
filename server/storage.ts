import { 
  users, 
  type User, 
  type InsertUser, 
  healthData, 
  type HealthData, 
  type InsertHealthData,
  healthReports,
  type HealthReport,
  type InsertHealthReport
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Health data operations
  getUserHealthData(userId: number, limit?: number): Promise<HealthData[]>;
  getLatestHealthData(userId: number): Promise<HealthData | undefined>;
  getHealthDataByTimeRange(userId: number, startTime: Date, endTime: Date): Promise<HealthData[]>;
  createHealthData(data: InsertHealthData): Promise<HealthData>;
  
  // Health reports operations
  getUserReports(userId: number, limit?: number): Promise<HealthReport[]>;
  getReportById(id: number): Promise<HealthReport | undefined>;
  createReport(report: InsertHealthReport): Promise<HealthReport>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private healthData: Map<number, HealthData>;
  private healthReports: Map<number, HealthReport>;
  private userId: number;
  private healthDataId: number;
  private healthReportId: number;

  constructor() {
    this.users = new Map();
    this.healthData = new Map();
    this.healthReports = new Map();
    this.userId = 1;
    this.healthDataId = 1;
    this.healthReportId = 1;
    
    // Add a demo user
    this.createUser({
      username: "demo",
      password: "password",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com"
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Health data operations
  async getUserHealthData(userId: number, limit?: number): Promise<HealthData[]> {
    const userHealthData = Array.from(this.healthData.values())
      .filter(data => data.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return limit ? userHealthData.slice(0, limit) : userHealthData;
  }
  
  async getLatestHealthData(userId: number): Promise<HealthData | undefined> {
    const userHealthData = await this.getUserHealthData(userId, 1);
    return userHealthData.length > 0 ? userHealthData[0] : undefined;
  }
  
  async getHealthDataByTimeRange(userId: number, startTime: Date, endTime: Date): Promise<HealthData[]> {
    return Array.from(this.healthData.values())
      .filter(data => 
        data.userId === userId && 
        new Date(data.timestamp) >= startTime && 
        new Date(data.timestamp) <= endTime
      )
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }
  
  async createHealthData(data: InsertHealthData): Promise<HealthData> {
    const id = this.healthDataId++;
    const healthDataItem: HealthData = { ...data, id };
    this.healthData.set(id, healthDataItem);
    return healthDataItem;
  }
  
  // Health reports operations
  async getUserReports(userId: number, limit?: number): Promise<HealthReport[]> {
    const userReports = Array.from(this.healthReports.values())
      .filter(report => report.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return limit ? userReports.slice(0, limit) : userReports;
  }
  
  async getReportById(id: number): Promise<HealthReport | undefined> {
    return this.healthReports.get(id);
  }
  
  async createReport(report: InsertHealthReport): Promise<HealthReport> {
    const id = this.healthReportId++;
    const healthReport: HealthReport = { ...report, id };
    this.healthReports.set(id, healthReport);
    return healthReport;
  }
}

export const storage = new MemStorage();
