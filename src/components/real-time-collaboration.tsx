'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  MessageSquare, 
  Video, 
  FileText, 
  Bell,
  Share2,
  ThumbsUp,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from 'lucide-react'

interface CollaborationSession {
  id: string
  title: string
  description: string
  participants: User[]
  status: 'active' | 'scheduled' | 'completed'
  startTime: string
  endTime?: string
}

interface User {
  id: string
  name: string
  role: string
  agency: string
  avatar?: string
  online: boolean
}

interface Discussion {
  id: string
  sessionId: string
  user: User
  message: string
  timestamp: string
  type: 'comment' | 'decision' | 'action_item'
  priority?: 'low' | 'medium' | 'high'
}

interface SharedDocument {
  id: string
  name: string
  type: 'report' | 'presentation' | 'spreadsheet' | 'pdf'
  uploadedBy: User
  uploadedAt: string
  size: string
}

export default function RealTimeCollaboration() {
  const [sessions, setSessions] = useState<CollaborationSession[]>([])
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [documents, setDocuments] = useState<SharedDocument[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [activeSession, setActiveSession] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading collaboration data
    const timer = setTimeout(() => {
      setSessions([
        {
          id: 'session-1',
          title: 'Q2 2024 Energy Security Strategy',
          description: 'Collaborative planning session for energy security measures',
          participants: [
            { id: 'user-1', name: 'Dr. Kwame Ansah', role: 'Deputy Minister', agency: 'Ministry of Energy', online: true },
            { id: 'user-2', name: 'Mrs. Abena Mensah', role: 'CEO', agency: 'ECG', online: true },
            { id: 'user-3', name: 'Eng. Michael Osei', role: 'MD', agency: 'GRIDCo', online: false },
            { id: 'user-4', name: 'Mr. Kwame Nkrumah', role: 'Director', agency: 'PURC', online: true }
          ],
          status: 'active',
          startTime: '2024-01-20T10:00:00Z'
        },
        {
          id: 'session-2',
          title: 'Renewable Energy Integration Plan',
          description: 'Planning meeting for renewable energy targets and implementation',
          participants: [
            { id: 'user-5', name: 'Dr. Ama Serwaa', role: 'Executive Director', agency: 'Energy Commission', online: true },
            { id: 'user-6', name: 'Mr. Kofi Adom', role: 'CEO', agency: 'VRA', online: true },
            { id: 'user-7', name: 'Mrs. Akosua Frimpong', role: 'Director', agency: 'EPA', online: false }
          ],
          status: 'scheduled',
          startTime: '2024-01-22T14:00:00Z'
        }
      ])

      setDiscussions([
        {
          id: 'disc-1',
          sessionId: 'session-1',
          user: { id: 'user-1', name: 'Dr. Kwame Ansah', role: 'Deputy Minister', agency: 'Ministry of Energy', online: true },
          message: 'We need to prioritize grid stability measures for the upcoming peak season. ECG, what are your preparedness plans?',
          timestamp: '2024-01-20T10:15:00Z',
          type: 'comment'
        },
        {
          id: 'disc-2',
          sessionId: 'session-1',
          user: { id: 'user-2', name: 'Mrs. Abena Mensah', role: 'CEO', agency: 'ECG', online: true },
          message: 'We\'ve increased our transformer inventory and scheduled preventive maintenance for critical substations. We\'re also implementing smart grid technologies.',
          timestamp: '2024-01-20T10:18:00Z',
          type: 'comment'
        },
        {
          id: 'disc-3',
          sessionId: 'session-1',
          user: { id: 'user-4', name: 'Mr. Kwame Nkrumah', role: 'Director', agency: 'PURC', online: true },
          message: 'DECISION: Approve emergency procurement of 50 additional transformers for ECG. Budget allocation: ₵25M from contingency fund.',
          timestamp: '2024-01-20T10:22:00Z',
          type: 'decision',
          priority: 'high'
        }
      ])

      setDocuments([
        {
          id: 'doc-1',
          name: 'Energy Security Assessment Q2 2024.pdf',
          type: 'pdf',
          uploadedBy: { id: 'user-1', name: 'Dr. Kwame Ansah', role: 'Deputy Minister', agency: 'Ministry of Energy', online: true },
          uploadedAt: '2024-01-20T09:30:00Z',
          size: '2.4 MB'
        },
        {
          id: 'doc-2',
          name: 'Grid Infrastructure Status Report.xlsx',
          type: 'spreadsheet',
          uploadedBy: { id: 'user-2', name: 'Mrs. Abena Mensah', role: 'CEO', agency: 'ECG', online: true },
          uploadedAt: '2024-01-20T10:05:00Z',
          size: '1.8 MB'
        },
        {
          id: 'doc-3',
          name: 'Renewable Energy Integration Strategy.pptx',
          type: 'presentation',
          uploadedBy: { id: 'user-5', name: 'Dr. Ama Serwaa', role: 'Executive Director', agency: 'Energy Commission', online: true },
          uploadedAt: '2024-01-20T09:45:00Z',
          size: '5.2 MB'
        }
      ])

      setActiveSession('session-1')
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim() && activeSession) {
      const newDiscussion: Discussion = {
        id: `disc-${discussions.length + 1}`,
        sessionId: activeSession,
        user: { id: 'current-user', name: 'You', role: 'System User', agency: 'Ministry of Energy', online: true },
        message: newMessage,
        timestamp: new Date().toISOString(),
        type: 'comment'
      }
      setDiscussions([...discussions, newDiscussion])
      setNewMessage('')
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'decision': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'action_item': return <AlertCircle className="h-4 w-4 text-orange-500" />
      default: return <MessageCircle className="h-4 w-4 text-blue-500" />
    }
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-4 w-4 text-red-500" />
      case 'spreadsheet': return <FileText className="h-4 w-4 text-green-500" />
      case 'presentation': return <FileText className="h-4 w-4 text-orange-500" />
      default: return <FileText className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Collaboration Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Real-Time Collaboration Hub
            </span>
          </CardTitle>
          <CardDescription>
            Collaborate seamlessly with energy sector stakeholders through real-time discussions, document sharing, and decision-making
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{sessions.filter(s => s.status === 'active').length}</div>
              <div className="text-sm text-muted-foreground">Active Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {sessions.reduce((acc, session) => acc + session.participants.filter(p => p.online).length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Online Participants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{discussions.length}</div>
              <div className="text-sm text-muted-foreground">Discussions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{documents.length}</div>
              <div className="text-sm text-muted-foreground">Shared Documents</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sessions Panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Video className="h-5 w-5" />
                <span>Active Sessions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    activeSession === session.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveSession(session.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{session.title}</h4>
                    <Badge 
                      variant={session.status === 'active' ? 'default' : session.status === 'scheduled' ? 'secondary' : 'destructive'}
                      className="text-xs"
                    >
                      {session.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{session.description}</p>
                  <div className="flex items-center space-x-1">
                    {session.participants.slice(0, 3).map((participant) => (
                      <Avatar key={participant.id} className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {session.participants.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{session.participants.length - 3}</span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Collaboration Area */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="discussion" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
            </TabsList>

            <TabsContent value="discussion" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Live Discussion</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {discussions
                      .filter(d => d.sessionId === activeSession)
                      .map((discussion) => (
                        <div key={discussion.id} className="flex space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {discussion.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm">{discussion.user.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {discussion.user.agency}
                              </Badge>
                              {getTypeIcon(discussion.type)}
                              {discussion.priority && (
                                <Badge variant={discussion.priority === 'high' ? 'destructive' : discussion.priority === 'medium' ? 'default' : 'secondary'} className="text-xs">
                                  {discussion.priority}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm">{discussion.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(discussion.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Shared Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {documents.map((document) => (
                      <div key={document.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getDocumentIcon(document.type)}
                          <div>
                            <p className="font-medium text-sm">{document.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded by {document.uploadedBy.name} • {document.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Download</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="participants" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Session Participants</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activeSession && sessions
                      .find(s => s.id === activeSession)
                      ?.participants.map((participant) => (
                        <div key={participant.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>
                                {participant.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{participant.name}</p>
                              <p className="text-sm text-muted-foreground">{participant.role} • {participant.agency}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${participant.online ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <span className="text-xs text-muted-foreground">
                              {participant.online ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}