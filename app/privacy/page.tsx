"use client"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-black tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground italic">Last Updated: April 7, 2026</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Welcome to InnateVoid. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">2. Data We Collect</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Identity Data: includes first name, last name, username or similar identifier.</li>
            <li>Contact Data: includes email address and telephone numbers.</li>
            <li>Technical Data: includes internet protocol (IP) address, your login data, browser type and version.</li>
            <li>Usage Data: includes information about how you use our website, products and services.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">3. How We Use Your Data</h2>
          <p className="text-muted-foreground leading-relaxed">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>To provide and maintain our service.</li>
            <li>To notify you about changes to our service.</li>
            <li>To provide customer support.</li>
            <li>To gather analysis or valuable information so that we can improve our service.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">4. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">5. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this privacy policy or our privacy practices, please contact us at support@innatevoid.com.
          </p>
        </section>
      </div>
    </div>
  )
}
