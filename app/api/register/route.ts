import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface RegistrationData {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  institution: string;
}

async function ensureFileHeader(filePath: string): Promise<void> {
  try {
    const stats = await fs.stat(filePath);
    if (stats.size === 0) {
      const header =
        "# Registration Submissions\n\n" +
        "| Timestamp | Full Name | Username | Password | Email | Phone | Institution |\n" +
        "|-----------|-----------|----------|----------|-------|------|-------------|\n";
      await fs.writeFile(filePath, header);
    }
  } catch {
    // File does not exist — create it with header
    const header =
      "# Registration Submissions\n\n" +
      "| Timestamp | Full Name | Username | Password | Email | Phone | Institution |\n" +
      "|-----------|-----------|----------|----------|-------|------|-------------|\n";
    await fs.writeFile(filePath, header);
  }
}

async function checkDuplicates(data: RegistrationData): Promise<string[]> {
  const errors: string[] = [];
  const filePath = path.join(process.cwd(), "submissions.md");

  try {
    const content = await fs.readFile(filePath, "utf-8");
    const lines = content.split("\n");

    // Find the header row index
    const headerIndex = lines.findIndex(
      (line) => line.trim().startsWith("|") && line.includes("Timestamp")
    );
    const dataLines = headerIndex >= 0 ? lines.slice(headerIndex + 2) : lines;

    let usernameFound = false;
    let emailFound = false;
    let phoneFound = false;

    for (const line of dataLines) {
      if (!line.trim()) continue;

      const fields = line.split("|").map((f) => f.trim());
      // Column indices: 0=empty, 1=timestamp, 2=fullName, 3=username, 4=password, 5=email, 6=phone, 7=institution
      const existingUsername = fields[3]?.toLowerCase();
      const existingEmail = fields[5]?.toLowerCase();
      const existingPhone = fields[6]?.toLowerCase();

      if (!usernameFound && data.username.toLowerCase() === existingUsername) {
        errors.push("Username already used");
        usernameFound = true;
      }
      if (!emailFound && data.email.toLowerCase() === existingEmail) {
        errors.push("Email already used");
        emailFound = true;
      }
      if (!phoneFound && data.phone.toLowerCase() === existingPhone) {
        errors.push("Phone number already used");
        phoneFound = true;
      }
    }
  } catch {
    // File doesn't exist or can't be read — no duplicates
    return [];
  }

  return errors;
}

function escapeMarkdown(text: string): string {
  return text.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function validateEmail(email: string): boolean {
  return email.endsWith(".go.tz");
}

function validatePhone(phone: string): boolean {
  return /^0\d{9}$/.test(phone);
}

function validatePassword(password: string): boolean {
  if (password.length < 8) return false;
  if (!/\d/.test(password)) return false;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  return true;
}

function validateRegistration(data: RegistrationData): string[] {
  const errors: string[] = [];

  if (!data.fullName?.trim()) {
    errors.push("Full Name is required");
  }

  if (!data.username?.trim()) {
    errors.push("Username is required");
  }

  if (!data.email?.trim()) {
    errors.push("Email is required");
  } else if (!validateEmail(data.email)) {
    errors.push("Email must end with .go.tz");
  }

  if (!data.phone?.trim()) {
    errors.push("Phone Number is required");
  } else if (!validatePhone(data.phone)) {
    errors.push("Phone Number must be 10 digits starting with 0");
  }

  if (!data.password?.trim()) {
    errors.push("Password is required");
  } else if (!validatePassword(data.password)) {
    errors.push(
      "Password must be at least 8 characters with at least one number and one special character"
    );
  }

  if (!data.institution?.trim()) {
    errors.push("Institution is required");
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data: RegistrationData = {
      fullName: body.fullName || "",
      username: body.username || "",
      email: body.email || "",
      phone: body.phone || "",
      password: body.password || "",
      institution: body.institution || "",
    };

    const errors = validateRegistration(data);
    const duplicateErrors = await checkDuplicates(data);
    const allErrors = [...errors, ...duplicateErrors];

    if (allErrors.length > 0) {
      return NextResponse.json({ success: false, errors: allErrors }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const row = `| ${timestamp} | ${escapeMarkdown(data.fullName)} | ${escapeMarkdown(data.username)} | ${escapeMarkdown(data.password)} | ${escapeMarkdown(data.email)} | ${escapeMarkdown(data.phone)} | ${escapeMarkdown(data.institution)} |\n`;

    const filePath = path.join(process.cwd(), "submissions.md");
    await ensureFileHeader(filePath);
    await fs.appendFile(filePath, row);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, errors: ["An error occurred processing your request"] },
      { status: 500 }
    );
  }
}