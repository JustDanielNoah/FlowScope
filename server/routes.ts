import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import {
  insertHealthDataSchema,
  insertHealthReportSchema,
  HealthStatus,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const apiRouter = express.Router();

  // User endpoints
  apiRouter.get("/users/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Don't return the password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  // Health data endpoints
  apiRouter.get("/health-data/latest/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const latestHealthData = await storage.getLatestHealthData(userId);
    if (!latestHealthData) {
      return res.status(404).json({ message: "No health data found for user" });
    }

    res.json(latestHealthData);
  });

  apiRouter.get("/health-data/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const healthData = await storage.getUserHealthData(userId, limit);
    res.json(healthData);
  });

  apiRouter.get("/health-data/:userId/range", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const startTimeStr = req.query.startTime as string;
    const endTimeStr = req.query.endTime as string;

    if (!startTimeStr || !endTimeStr) {
      return res.status(400).json({ message: "Start time and end time are required" });
    }

    const startTime = new Date(startTimeStr);
    const endTime = new Date(endTimeStr);

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const healthData = await storage.getHealthDataByTimeRange(userId, startTime, endTime);
    res.json(healthData);
  });

  apiRouter.post("/health-data", async (req, res) => {
    try {
      const validatedData = insertHealthDataSchema.parse(req.body);
      const newHealthData = await storage.createHealthData(validatedData);
      res.status(201).json(newHealthData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid health data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create health data" });
    }
  });

  // Health reports endpoints
  apiRouter.get("/reports/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const reports = await storage.getUserReports(userId, limit);
    res.json(reports);
  });

  apiRouter.get("/reports/detail/:id", async (req, res) => {
    const reportId = parseInt(req.params.id);
    if (isNaN(reportId)) {
      return res.status(400).json({ message: "Invalid report ID" });
    }

    const report = await storage.getReportById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(report);
  });

  apiRouter.post("/reports", async (req, res) => {
    try {
      const validatedData = insertHealthReportSchema.parse(req.body);
      const newReport = await storage.createReport(validatedData);
      res.status(201).json(newReport);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid report data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create report" });
    }
  });

  // AI Analysis endpoint (simplified for demo)
  apiRouter.post("/analyze", async (req, res) => {
    try {
      const { userId, dataPoints } = req.body;
      
      if (!userId || !dataPoints || !Array.isArray(dataPoints)) {
        return res.status(400).json({ message: "Invalid analysis request" });
      }
      
      // In a real app, we would perform actual analysis with AI
      // For now, return a mock response based on provided data
      const randomValue = Math.random();
      let healthStatus;
      let recommendation;
      
      if (randomValue < 0.7) {
        healthStatus = HealthStatus.HEALTHY;
        recommendation = "Your heart is functioning well. Continue with your healthy habits.";
      } else if (randomValue < 0.9) {
        healthStatus = HealthStatus.CONCERNING;
        recommendation = "Some metrics need attention. Consider consulting with your healthcare provider.";
      } else {
        healthStatus = HealthStatus.CRITICAL;
        recommendation = "Critical readings detected. Please seek immediate medical attention.";
      }
      
      res.json({
        status: healthStatus,
        recommendation,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ message: "Analysis failed", error: error.message });
    }
  });

  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
