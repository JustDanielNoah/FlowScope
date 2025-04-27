import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  firstName: true,
  lastName: true,
  email: true,
});

export const healthData = pgTable("health_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  ecgData: json("ecg_data"),
  heartRate: integer("heart_rate"),
  bloodOxygen: integer("blood_oxygen"),
  bloodPressureSystolic: integer("blood_pressure_systolic"),
  bloodPressureDiastolic: integer("blood_pressure_diastolic"),
  respiratoryRate: integer("respiratory_rate"),
  recoveryRate: integer("recovery_rate"),
  healthStatus: text("health_status").notNull(),
});

export const insertHealthDataSchema = createInsertSchema(healthData).omit({
  id: true,
});

export const healthReports = pgTable("health_reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  healthStatus: text("health_status").notNull(),
  createdAt: timestamp("created_at").notNull(),
  reportData: json("report_data"),
});

export const insertHealthReportSchema = createInsertSchema(healthReports).omit({
  id: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type HealthData = typeof healthData.$inferSelect;
export type InsertHealthData = z.infer<typeof insertHealthDataSchema>;

export type HealthReport = typeof healthReports.$inferSelect;
export type InsertHealthReport = z.infer<typeof insertHealthReportSchema>;

export enum HealthStatus {
  HEALTHY = "healthy",
  CONCERNING = "concerning",
  CRITICAL = "critical",
}
