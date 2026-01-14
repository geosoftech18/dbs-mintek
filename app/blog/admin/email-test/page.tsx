'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function EmailTestPage() {
  const [email, setEmail] = useState('pranavkhandekar152@gmail.com')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testEmail = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const response = await fetch('/api/auth/send-otp-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'Network error'
      })
    } finally {
      setLoading(false)
    }
  }

  const testBrevoConfig = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const response = await fetch('/api/auth/test-email')
      const data = await response.json()
      setResult(data)
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'Network error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Email Service Diagnostics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-white/90">Test Email Address</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white mt-2"
                  placeholder="Enter email to test"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={testBrevoConfig}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Testing...' : 'Test Brevo Config'}
                </Button>
                <Button
                  onClick={testEmail}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? 'Sending...' : 'Send Test Email'}
                </Button>
              </div>
            </div>

            {result && (
              <div className={`p-4 rounded-lg ${result.success ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                <h3 className={`font-semibold mb-2 ${result.success ? 'text-green-200' : 'text-red-200'}`}>
                  {result.success ? '✅ Success' : '❌ Error'}
                </h3>
                <pre className="text-xs text-white/70 overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            <div className="text-sm text-white/60 space-y-2">
              <p><strong>Instructions:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Click "Test Brevo Config" to verify your API key</li>
                <li>Click "Send Test Email" to send a test email</li>
                <li>Check your email inbox (and spam folder)</li>
                <li>Check server terminal for detailed logs</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

