import { HealthStatus } from "./types";

export const getHealthStatusColor = (status: HealthStatus) => {
  switch (status) {
    case HealthStatus.HEALTHY:
      return {
        text: "text-green-600",
        bg: "bg-green-500",
        bgLight: "bg-green-500/10",
        border: "border-green-200"
      };
    case HealthStatus.CONCERNING:
      return {
        text: "text-amber-600",
        bg: "bg-amber-500",
        bgLight: "bg-amber-500/10",
        border: "border-amber-200"
      };
    case HealthStatus.CRITICAL:
      return {
        text: "text-red-600",
        bg: "bg-red-500",
        bgLight: "bg-red-500/10",
        border: "border-red-200"
      };
    default:
      return {
        text: "text-gray-600",
        bg: "bg-gray-500",
        bgLight: "bg-gray-500/10",
        border: "border-gray-200"
      };
  }
};

export const getBloodOxygenStatus = (value: number): HealthStatus => {
  if (value >= 95) return HealthStatus.HEALTHY;
  if (value >= 90) return HealthStatus.CONCERNING;
  return HealthStatus.CRITICAL;
};

export const getBloodPressureStatus = (systolic: number, diastolic: number): HealthStatus => {
  if (systolic <= 120 && diastolic <= 80) return HealthStatus.HEALTHY;
  if (systolic <= 139 && diastolic <= 89) return HealthStatus.CONCERNING;
  return HealthStatus.CRITICAL;
};

export const getRespiratoryRateStatus = (value: number): HealthStatus => {
  if (value >= 12 && value <= 20) return HealthStatus.HEALTHY;
  if (value >= 10 && value <= 24) return HealthStatus.CONCERNING;
  return HealthStatus.CRITICAL;
};

export const getRecoveryRateStatus = (value: number): HealthStatus => {
  if (value >= 80) return HealthStatus.HEALTHY;
  if (value >= 60) return HealthStatus.CONCERNING;
  return HealthStatus.CRITICAL;
};

export const getHeartRateStatus = (value: number): HealthStatus => {
  if (value >= 60 && value <= 100) return HealthStatus.HEALTHY;
  if ((value >= 50 && value < 60) || (value > 100 && value <= 110)) return HealthStatus.CONCERNING;
  return HealthStatus.CRITICAL;
};

export const getStatusLabel = (status: HealthStatus): string => {
  switch (status) {
    case HealthStatus.HEALTHY:
      return "Normal";
    case HealthStatus.CONCERNING:
      return "Monitoring";
    case HealthStatus.CRITICAL:
      return "Critical";
    default:
      return "Unknown";
  }
};
