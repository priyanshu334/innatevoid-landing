"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, MessageSquare, Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(1, "Message is required"),
})
export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
  })

  const onSubmit = async (data: z.infer<typeof ContactSchema>) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result = await res.json()

      if (res.ok && result.success) {
        toast.success("Message sent successfully!");
        reset()
      } else {
        toast.error(result.error ?? "Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message")
    }
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>

          <Card className="border-border/50 shadow-2xl shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl">Send a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="John" {...register("name")} />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input placeholder="john@example.com" type="email" {...register("email")} />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Tell us more about your project..."
                  className="min-h-[150px]"
                  {...register("message")}
                />
                {errors.message && <p className="text-red-500">{errors.message.message}</p>}
              </div>
              <Button className="w-full py-6 text-lg font-bold gap-2">
                Send Message <Send className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </form>


      </div>
    </div>
  )
}
