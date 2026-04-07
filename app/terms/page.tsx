"use client"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-black tracking-tight">Terms of Service</h1>
        <p className="text-muted-foreground italic">Last Updated: April 7, 2026</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">1. Agreement to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using InnateVoid, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">2. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Service and its original content, features and functionality are and will remain the exclusive property of InnateVoid and its licensors. Our intellectual property may not be used in connection with any product or service without the prior written consent of InnateVoid.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">3. User Accounts</h2>
          <p className="text-muted-foreground leading-relaxed">
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">4. Termination</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">5. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            In no event shall InnateVoid, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">6. Changes</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our Service may contain links to third-party web sites or services that are not owned or controlled by InnateVoid. InnateVoid has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">7. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about these Terms, please contact us at support@innatevoid.com.
          </p>
        </section>
      </div>
    </div>
  )
}
