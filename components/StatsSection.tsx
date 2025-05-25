"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Users, 
  Star, 
  Zap, 
  Globe, 
  Award,
  ArrowUp,
  Activity
} from "lucide-react"

interface StatItem {
  label: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: React.ComponentType<any>
  color: string
  description: string
}

const stats: StatItem[] = [
  {
    label: "AI Tools",
    value: "150+",
    change: "+12",
    changeType: "positive",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    description: "Curated AI tools across all categories"
  },
  {
    label: "Active Users",
    value: "50K+",
    change: "+2.3K",
    changeType: "positive",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    description: "Monthly active users discovering AI tools"
  },
  {
    label: "Average Rating",
    value: "4.8",
    change: "+0.2",
    changeType: "positive",
    icon: Star,
    color: "from-yellow-500 to-orange-500",
    description: "User satisfaction rating"
  },
  {
    label: "Countries",
    value: "120+",
    change: "+8",
    changeType: "positive",
    icon: Globe,
    color: "from-green-500 to-emerald-500",
    description: "Global reach across continents"
  }
]

const achievements = [
  { icon: Award, label: "Top AI Directory", color: "text-yellow-500" },
  { icon: TrendingUp, label: "Fastest Growing", color: "text-green-500" },
  { icon: Activity, label: "Most Comprehensive", color: "text-blue-500" }
]

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg mb-6">
            <Activity className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Platform Statistics
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Join our growing community of AI enthusiasts and professionals discovering the best tools
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card 
                key={index}
                className="group relative overflow-hidden border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Animated Border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    {stat.changeType === 'positive' && (
                      <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-0">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300" style={{backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`}}>
                      {stat.value}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Achievements Section */}
        <Card className="bg-gradient-to-r from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Recognition & Awards
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Acknowledged by the AI community for excellence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon
                return (
                  <div 
                    key={index}
                    className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 group"
                  >
                    <IconComponent className={`w-6 h-6 ${achievement.color} group-hover:scale-110 transition-transform duration-300`} />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {achievement.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="font-semibold">Join our community today</span>
            <ArrowUp className="w-4 h-4 rotate-45" />
          </div>
        </div>
      </div>
    </section>
  )
} 