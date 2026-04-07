"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Let&apos;s build <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-orange-600">
                together.
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md">
              Have a question about our templates, prompts, or looking for custom solutions? Drop us a message.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Email Us</p>
                <p className="text-muted-foreground">support@innatevoid.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Community</p>
                <p className="text-muted-foreground">Join our Discord server</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="border-border/50 shadow-2xl shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Send a Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input placeholder="john@example.com" type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="How can we help?" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                placeholder="Tell us more about your project..."
                className="min-h-[150px]"
              />
            </div>
            <Button className="w-full py-6 text-lg font-bold gap-2">
              Send Message <Send className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
