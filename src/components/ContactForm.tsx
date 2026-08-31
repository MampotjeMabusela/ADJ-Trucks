"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY } from "@/lib/constants";
import { sanitizeInput, buildMailtoUrl, buildWhatsAppUrl } from "@/lib/utils";
import type { ContactFormData } from "@/types/truck";

interface ContactFormProps {
  truckTitle?: string;
  truckId?: string;
}

export function ContactForm({ truckTitle, truckId }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    message: truckTitle
      ? `I'm interested in the ${truckTitle}${truckId ? ` (Ref: ${truckId})` : ""}.`
      : "",
    truckId,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = "Please enter your full name";
    }
    if (!form.phone.trim() || !/^[\d\s+\-()]{7,20}$/.test(form.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = "Please enter a message (min 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const sanitized: ContactFormData = {
      name: sanitizeInput(form.name),
      phone: sanitizeInput(form.phone),
      email: sanitizeInput(form.email),
      message: sanitizeInput(form.message),
      truckId: form.truckId,
    };

    const subject = truckTitle
      ? `Enquiry: ${truckTitle}`
      : "Website Enquiry - ADJ TRUCKS";

    const body = [
      `Name: ${sanitized.name}`,
      `Phone: ${sanitized.phone}`,
      `Email: ${sanitized.email}`,
      truckId ? `Truck Ref: ${truckId}` : "",
      "",
      sanitized.message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailtoUrl = buildMailtoUrl(COMPANY.contact.email, subject, body);
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    if (!validate()) return;

    const message = [
      `Hello ADJ TRUCKS,`,
      ``,
      `Name: ${sanitizeInput(form.name)}`,
      `Phone: ${sanitizeInput(form.phone)}`,
      `Email: ${sanitizeInput(form.email)}`,
      truckTitle ? `Interested in: ${truckTitle}` : "",
      ``,
      sanitizeInput(form.message),
    ]
      .filter(Boolean)
      .join("\n");

    const url = buildWhatsAppUrl(COMPANY.whatsapp.number, message);
    window.open(url, "_blank");
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-lg font-bold mb-2">Enquiry Sent!</h3>
        <p className="text-sm text-muted-foreground">
          Your email client should open shortly. If not, please contact us directly
          via WhatsApp or phone.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Smith"
            className="mt-1.5"
          />
          {errors.name && (
            <p className="text-xs text-red-400 mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+27 82 123 4567"
            className="mt-1.5"
          />
          {errors.phone && (
            <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="john@company.co.za"
          className="mt-1.5"
        />
        {errors.email && (
          <p className="text-xs text-red-400 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">
          {truckTitle ? "Your Message / Offer" : "Message *"}
        </Label>
        <Textarea
          id="message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your requirements..."
          className="mt-1.5"
        />
        {errors.message && (
          <p className="text-xs text-red-400 mt-1">{errors.message}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="submit" className="flex-1">
          <Send className="h-4 w-4" />
          Send Enquiry
        </Button>
        <Button
          type="button"
          variant="whatsapp"
          className="flex-1"
          onClick={handleWhatsApp}
        >
          Send via WhatsApp
        </Button>
      </div>
    </form>
  );
}

