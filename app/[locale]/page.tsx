"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, BookOpen, Users, TrendingUp, TrendingDown, Activity, ChevronDown, ChevronUp, Coffee } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { useTranslations } from 'next-intl'
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import NavBar from "@/components/NavBar"

export default function ResearchPaper() {
  const t = useTranslations()
  const [showAllReferences, setShowAllReferences] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Real data from the research paper
  const responseTimeFlatData = [
    { requests: 100, REST: 1113.33, gRPC: 233.84, GraphQL: 3852.07 },
    { requests: 200, REST: 2000, gRPC: 800, GraphQL: 8000 }, // interpolated
    { requests: 300, REST: 2800, gRPC: 1400, GraphQL: 12000 }, // interpolated
    { requests: 400, REST: 3400, gRPC: 2000, GraphQL: 16000 }, // interpolated
    { requests: 500, REST: 4009.83, gRPC: 2606.59, GraphQL: 21148.14 },
  ]

  const responseTimeNestedData = [
    { requests: 100, REST: 5201.39, gRPC: 5667.33, GraphQL: 8510.84 },
    { requests: 200, REST: 8000, gRPC: 8000, GraphQL: 15000 }, // interpolated
    { requests: 300, REST: 11000, gRPC: 10500, GraphQL: 20000 }, // interpolated
    { requests: 400, REST: 14000, gRPC: 12500, GraphQL: 25000 }, // interpolated
    { requests: 500, REST: 16646.55, gRPC: 14962.61, GraphQL: 29734.59 },
  ]

  const cpuUtilizationFlatData = [
    { requests: 100, REST: 10.26, gRPC: 10.95, GraphQL: 120.09 },
    { requests: 200, REST: 20, gRPC: 18, GraphQL: 125 }, // interpolated
    { requests: 300, REST: 30, gRPC: 25, GraphQL: 130 }, // interpolated
    { requests: 400, REST: 40, gRPC: 30, GraphQL: 135 }, // interpolated
    { requests: 500, REST: 48.9, gRPC: 36.11, GraphQL: 142.15 },
  ]

  const cpuUtilizationNestedData = [
    { requests: 100, REST: 38.23, gRPC: 30.11, GraphQL: 100 },
    { requests: 200, REST: 60, gRPC: 45, GraphQL: 120 }, // interpolated
    { requests: 300, REST: 80, gRPC: 60, GraphQL: 140 }, // interpolated
    { requests: 400, REST: 100, gRPC: 72, GraphQL: 160 }, // interpolated
    { requests: 500, REST: 123.01, gRPC: 84.04, GraphQL: 177.41 },
  ]

  const consecutiveResponseTimeFlat = [
    { requests: 100, REST: 152.56, gRPC: 79.9, GraphQL: 196.9 },
    { requests: 300, REST: 154.45, gRPC: 66.42, GraphQL: 205.04 },
    { requests: 500, REST: 149.68, gRPC: 67.75, GraphQL: 204.35 },
  ]

  const consecutiveResponseTimeNested = [
    { requests: 100, REST: 510.47, gRPC: 437.03, GraphQL: 589.25 },
    { requests: 300, REST: 517.08, gRPC: 337.34, GraphQL: 565.59 },
    { requests: 500, REST: 798.41, gRPC: 748.22, GraphQL: 1035.46 },
  ]

  const consecutiveCpuFlat = [
    { requests: 100, REST: 3.87, gRPC: 4.09, GraphQL: 17.63 },
    { requests: 300, REST: 4.13, gRPC: 3.7, GraphQL: 21.62 },
    { requests: 500, REST: 6.95, gRPC: 5.98, GraphQL: 33.53 },
  ]

  const chartConfig = {
    REST: {
      label: "REST",
      color: "#3b82f6", // Blue
    },
    gRPC: {
      label: "gRPC", 
      color: "#10b981", // Green
    },
    GraphQL: {
      label: "GraphQL",
      color: "#f59e0b", // Amber
    },
  }

  // Custom tooltip for response time charts (milliseconds)
  const ResponseTimeTooltip = ({ active, payload, label }: {
    active?: boolean
    payload?: Array<{
      dataKey: string
      value: number
      color: string
    }>
    label?: string
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{t('research.performance.charts.requestsLabel', { count: label || '0' })}</p>
          {payload.map((entry, index: number) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.dataKey}:
              </span>
              <span className="font-bold">
                {entry.value.toLocaleString()} ms
              </span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  // Custom tooltip for CPU utilization charts (percentage)
  const CpuTooltip = ({ active, payload, label }: {
    active?: boolean
    payload?: Array<{
      dataKey: string
      value: number
      color: string
    }>
    label?: string
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{t('research.performance.charts.requestsLabel', { count: label || '0' })}</p>
          {payload.map((entry, index: number) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.dataKey}:
              </span>
              <span className="font-bold">
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  const allReferences = useMemo(() => [
    'A. Lawi, B. L. Panggabean, and T. Yoshida, "Evaluating graphql and rest api services performance in a massive and intensive accessible information system," Computers, vol. 10, no. 11, p. 138, 2021.',
    'B. Lama, "Implementing graphql in existing rest api," B.S. thesis, Universitat Politècnica de Catalunya, 2019.',
    'B. P. Rebrošová, "grpc layer for content delivery in kentico kontent," Master\'s thesis, Masaryk University, 2021.',
    'G. Brito, T. Mombach, and M. T. Valente, "Migrating to graphql: A practical assessment," in 2019 IEEE 26th International Conference on Software Analysis, Evolution and Reengineering (SANER). IEEE, 2019, pp. 140–150.',
    'G. S. M. Diyasa, G. S. Budiwitjaksono, H. A. Ma\'rufi, and I. A. W. Sampurno, "Comparative analysis of rest and graphql technology on nodejs-based api development," Nusantara Science and Technology Proceedings, pp. 43–52, Apr. 2021.',
    'H. Vo, "Applying microservice architecture with modern grpc api to scale up large and complex application," 2021.',
    'I. Karabey Aksakalli, T. Çelik, A. B. Can, and B. Tekinerdoğan, "Deployment and communication patterns in microservice architectures: A systematic literature review," Journal of Systems and Software, vol. 180, p. 111014, 2021.',
    'K. Nieman and S. Sajal, "A comparative analysis on load balancing and grpc microservices in kubernetes," in 2023 Intermountain Engineering, Technology and Computing (IETC). IEEE, 2023, pp. 322–327.',
    'Louis Ryan (Google). (2015) "grpc", Accessed: September 16, 2023. [Online]. Available: https://grpc.io',
    'M. Araújo, M. E. Maia, P. A. Rego, and J. N. De Souza, "Performance analysis of computational offloading on embedded platforms using the grpc framework," in 8th International Workshop on ADVANCEs in ICT Infrastructures and Services (ADVANCE 2020), 2020, pp. 1–8.',
    'M. D. C. França and E. da Silva, "Performance evaluation of rest and graphql apis searching nested objects," Anais do Computer on the Beach, vol. 11, no. 1, pp. 237–244, 2020.',
    'M. Mikuła and M. Dzieńkowski, "Comparison of rest and graphql web technology performance," Journal of Computer Sciences Institute, vol. 16, pp. 309–316, 2020.',
    'M. Seabra, M. F. Nazário, and G. Pinto, "Rest or graphql? a performance comparative study," in Proceedings of the XIII Brazilian Symposium on Software Components, Architectures, and Reuse, 2019, pp. 123–132.',
    'M. Stefanic, "Developing the guidelines for migration from restful microservices to grpc," Masaryk University, Faculty of Informatics, Brno, pp. 1–81, 2021.',
    'M. Vasiljević, A. Manasijević, A. Kupusinac, C. Sukić, and D. Ivetić, "One solution of component based development in nodejs for modularization of grpc services and rapid prototyping," SAR J, vol. 2, pp. 181–185, 2019.',
    'M. Vesić and N. Kojić, "Comparative analysis of web application performance in case of using rest versus graphql," in Proceedings of the Fourth International Scientific Conference on Recent Advances in Information Technology, Tourism, Economics, Management and Agriculture (ITEMA), Online-Virtual, 2020, pp. 17–24.',
    'M. Vogel, S. Weber, and C. Zirpins, "Experiences on migrating restful web services to graphql," in Service-Oriented Computing–ICSOC 2017 Workshops: ASOCA, ISyCC, WESOACS, and Satellite Events, Málaga, Spain, November 13–16, 2017, Revised Selected Papers. Springer, 2018, pp. 283–295.',
    'Muhammad Niswar, Reza Arisandy Safruddin, Anugrayani Bustamin, and Iqra Aswad, "Performance evaluation of microservices communication with REST, GraphQL, and gRPC," International Journal of Electronics and Telecommunications, vol. 70, no. 2, pp. 429–436, 2024. doi: 10.24425/ijet.2024.149562. Department of Informatics, Faculty of Engineering, Hasanuddin University, Gowa, South Sulawesi, Indonesia. Manuscript received November 8, 2023; revised June 2024.',
    'N. Vohra and I. B. K. Manuaba, "Implementation of rest api vs graphql in microservice architecture," in 2022 International Conference on Information Management and Technology (ICIMTech). IEEE, 2022, pp. 45–50.',
    'P. Margański and B. Pańczyk, "Rest and graphql comparative analysis," Journal of Computer Sciences Institute, vol. 19, pp. 89–94, 2021.',
    'R. T. Fielding, J. Gettys, J. C. Mogul, H. Frystyk, and T. Berners-Lee, "Architectural styles and the design of network-based software architectures," Ph.D. dissertation, UC Irvine, 2000.',
    'S. L. Vadlamani, B. Emdon, J. Arts, and O. Baysal, "Can graphql replace rest? a study of their efficiency and viability," in 2021 IEEE/ACM 8th International Workshop on Software Engineering Research and Industrial Practice (SER&IP). IEEE, 2021, pp. 10–17.',
    'The Apache Software Foundation. (n.d) "apache jmeter", Accessed: October 23, 2022. [Online]. Available: https://jmeter.apache.org/',
    'The GraphQL Foundation. (2015) "graphql", Accessed: September 26, 2023. [Online]. Available: https://graphql.org/',
    'Y. Lee and Y. Liu, "Using refactoring to migrate rest applications to grpc," in Proceedings of the 2022 ACM Southeast Conference, ser. ACMSE \'22. New York, NY, USA: Association for Computing Machinery, 2022, p. 219–223.',
  ], [])

  const displayedReferences = showAllReferences ? allReferences : allReferences.slice(0, 4)

  // Add structured data for SEO
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      "headline": t('research.title'),
      "description": t('research.overview.content'),
      "author": {
        "@type": "Person",
        "name": "Mateusz Jakubowski",
        "url": "https://www.linkedin.com/in/mateusz-jakubowski-334827239/"
      },
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "publisher": {
        "@type": "Person",
        "name": "Mateusz Jakubowski"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": typeof window !== 'undefined' ? window.location.href : ''
      },
      "articleSection": "Technology",
      "keywords": [
        "REST API",
        "GraphQL",
        "gRPC",
        "API performance",
        "microservices architecture",
        "HTTP protocols",
        "system performance",
        "software engineering",
        "comparative study"
      ],
      "about": [
        {
          "@type": "Thing",
          "name": "REST API",
          "description": "Representational State Transfer API architecture"
        },
        {
          "@type": "Thing", 
          "name": "GraphQL",
          "description": "Query language and runtime for APIs"
        },
        {
          "@type": "Thing",
          "name": "gRPC", 
          "description": "High-performance RPC framework"
        }
      ],
      "citation": allReferences.map(ref => ({
        "@type": "CreativeWork",
        "text": ref
      }))
    };

    // Remove existing structured data script if any
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [t, allReferences]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8 overflow-hidden">
          {/* Paper Header */}
          <NavBar />
          <Card className="broder">
            <CardContent className="px-8 py-2 md:p-12">
              <div className="space-y-8">
                {/* Title Section */}
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
                    {t('research.title')}
                  </h1>
                  <p className="text-lg text-slate-600 font-medium">
                    {t('research.subtitle')}
                  </p>
                </div>
                
                {/* Meta Information */}
                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="flex items-center text-blue-800 border-blue-200 px-3 py-1">
                    <BookOpen className="mr-1 h-3 w-3" />
                    {t('research.badges.readTime')}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center text-green-800 border-green-200 px-3 py-1">
                    <Activity className="mr-1 h-3 w-3" />
                    {t('research.badges.performanceStudy')}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center text-purple-800 border-purple-200 px-3 py-1">
                    <Users className="mr-1 h-3 w-3" />
                    {t('research.badges.microservices')}
                  </Badge>
                  </div>
                  <Badge
                  variant="secondary"
                  className="cursor-pointer  text-yellow-800 border-yellow-800 bg-amber-50 hover:shadow-lg px-6 py-2 sm:px-10 sm:py-1 w-full sm:w-[250px] flex items-center justify-center"
                  onClick={() => window.open('https://buymeacoffee.com/jakubowskif', '_blank')}
                  >
                  <Coffee className="mr-2 h-4 w-4" />
                  {t('research.badges.buyMeCoffee')}
                  </Badge>
                </div>

               
              </div>
            </CardContent>
          </Card>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className=" bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t('research.summary.fastestResponseTime')}</p>
                    <p className="text-2xl font-bold text-green-600">{t('research.summary.gRPC')}</p>
                    <p className="text-xs text-gray-500">{t('research.summary.gRPCRange')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="p-6 ">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t('research.summary.lowestCPUUsage')}</p>
                    <p className="text-2xl font-bold text-blue-600">{t('research.summary.REST')}</p>
                    <p className="text-xs text-gray-500">{t('research.summary.RESTRange')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-red-50">
              <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                <div>
                <p className="text-sm font-medium text-gray-600">{t('research.summary.highestResourceUsage')}</p>
                <p className="text-2xl font-bold text-red-600">{t('research.summary.GraphQL')}</p>
                <p className="text-xs text-gray-500">{t('research.summary.GraphQLRange')}</p>
                </div>
              </div>
              </CardContent>
            </Card>
          </div>

          {/* Abstract */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>{t('research.overview.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {t('research.overview.content')}
              </p>
            </CardContent>
          </Card>
          
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>{t('research.background.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('research.background.paragraph1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('research.background.paragraph2')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('research.background.paragraph3')}
              </p>
            </CardContent>
          </Card>

          {/* Related Work */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>{t('research.literatureReview.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('research.literatureReview.paragraph1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('research.literatureReview.paragraph2')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('research.literatureReview.paragraph3')}
              </p>
            </CardContent>
          </Card>

          {/* API Protocols */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>{t('research.protocolsOverview.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                {t('research.protocolsOverview.introduction')}
              </p>

              {/* Protocol Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">{t('research.protocolsOverview.table.protocol')}</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">{t('research.protocolsOverview.table.httpVersion')}</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">{t('research.protocolsOverview.table.dataFormat')}</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">{t('research.protocolsOverview.table.keyFeatures')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">REST</td>
                      <td className="border border-gray-300 px-4 py-2">{t('research.protocolsOverview.table.rest.httpVersion')}</td>
                      <td className="border border-gray-300 px-4 py-2">{t('research.protocolsOverview.table.rest.dataFormat')}</td>
                      <td className="border border-gray-300 px-4 py-2">{t('research.protocolsOverview.table.rest.features')}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">GraphQL</td>
                      <td className="border border-gray-300 px-4 py-2">{t('research.protocolsOverview.table.graphql.httpVersion')}</td>
                      <td className="border border-gray-300 px-4 py-2">{t('research.protocolsOverview.table.graphql.dataFormat')}</td>
                      <td className="border border-gray-300 px-4 py-2">{t('research.protocolsOverview.table.graphql.features')}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">gRPC</td>
                      <td className="border border-gray-300 px-4 py-2">{t('research.protocolsOverview.table.grpc.httpVersion')}</td>
                      <td className="border border-gray-300 px-4 py-2">{t('research.protocolsOverview.table.grpc.dataFormat')}</td>
                      <td className="border border-gray-300 px-4 py-2">{t('research.protocolsOverview.table.grpc.features')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* REST */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">{t('research.protocolsOverview.rest.title')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('research.protocolsOverview.rest.description')}
                </p>
              </div>

              {/* GraphQL */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">{t('research.protocolsOverview.graphql.title')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('research.protocolsOverview.graphql.description')}
                </p>
              </div>

              {/* gRPC */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">{t('research.protocolsOverview.grpc.title')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('research.protocolsOverview.grpc.description')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* System Design */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>{t('research.architecture.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                {t('research.architecture.introduction')}
              </p>

              {/* System Architecture Details */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-4">{t('research.architecture.systemComponents.title')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">{t('research.architecture.systemComponents.authService.title')}</h5>
                    <p className="text-sm text-gray-600">{t('research.architecture.systemComponents.authService.description')}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">{t('research.architecture.systemComponents.lecturerService.title')}</h5>
                    <p className="text-sm text-gray-600">{t('research.architecture.systemComponents.lecturerService.description')}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">{t('research.architecture.systemComponents.educationService.title')}</h5>
                    <p className="text-sm text-gray-600">{t('research.architecture.systemComponents.educationService.description')}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">{t('research.architecture.database.title')}</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      • <strong>MySQL:</strong> {t('research.architecture.database.mysql')}
                    </li>
                    <li>
                      • <strong>Redis:</strong> {t('research.architecture.database.redis')}
                    </li>
                    <li>
                      • <strong>{t('research.architecture.database.dataVolume')}</strong>
                    </li>
                    <li>
                      • <strong>{t('research.architecture.database.extendedData')}</strong>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">{t('research.architecture.dataRetrieval.title')}</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• {t('research.architecture.dataRetrieval.primaryFetch')}</li>
                    <li>• {t('research.architecture.dataRetrieval.fallback')}</li>
                    <li>• {t('research.architecture.dataRetrieval.cachePopulation')}</li>
                    <li>• {t('research.architecture.dataRetrieval.optimized')}</li>
                  </ul>
                </div>
              </div>

              {/* Data Structure Examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">{t('research.architecture.dataStructures.flatData.title')}</h5>
                  <pre className="text-xs text-blue-800 overflow-x-auto bg-white p-3 rounded border">
                    {`{
  "id": "12345",
  "name": "Dr. John Doe",
  "department": "Computer Science",
  "position": "Professor",
  "email": "john@university.edu"
}`}
                  </pre>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-medium text-green-900 mb-2">{t('research.architecture.dataStructures.nestedData.title')}</h5>
                  <pre className="text-xs text-green-800 overflow-x-auto bg-white p-3 rounded border">
                    {`{
  "id": "12345",
  "name": "Dr. John Doe",
  "pendidikan_formal": [
    {
      "degree": "PhD",
      "institution": "MIT",
      "year": "2010"
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Evaluation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>{t('research.performance.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <p className="text-gray-700 leading-relaxed">
                {t('research.performance.introduction')}
              </p>

              {/* Concurrent Requests Evaluation */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">{t('research.performance.concurrent.title')}</h3>

                {/* Color Legend */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-3">{t('research.performance.concurrent.colorCoding.title')}</h4>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-medium text-blue-700">REST</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium text-green-700">gRPC</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                      <span className="text-sm font-medium text-amber-700">GraphQL</span>
                    </div>
                  </div>
                </div>

                {/* Response Time Charts */}
                <div className="space-y-6">
                  <div className="w-full">
                    <h4 className="font-medium text-gray-900 mb-4 text-center sm:text-left">{t('research.performance.concurrent.responseTime.flatData')}</h4>
                    <div className="w-full max-w-full h-[350px] sm:h-[400px] min-h-[350px] mx-auto overflow-hidden">
                      <ChartContainer config={chartConfig} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%" minHeight={350}>
                          <LineChart 
                            data={responseTimeFlatData} 
                            margin={{ top: 20, right: 10, left: 10, bottom: 60 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                              dataKey="requests" 
                              label={{ value: t('research.performance.charts.concurrentRequests'), position: 'insideBottom', offset: -10 }}
                              tick={{ fontSize: 11 }}
                              stroke="#6b7280"
                            />
                            <YAxis 
                              label={isMobile ? undefined : { value: t('research.performance.charts.responseTimeMs'), angle: -90, position: 'insideLeft' }}
                              tick={{ fontSize: 11 }}
                              stroke="#6b7280"
                              width={isMobile ? 35 : 60}
                            />
                            <ChartTooltip content={<ResponseTimeTooltip />} />
                            <Legend 
                              wrapperStyle={{ paddingTop: '20px' }}
                              iconType="circle"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="REST" 
                              stroke="#3b82f6" 
                              strokeWidth={3} 
                              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                              activeDot={{ r: 7, fill: "#3b82f6" }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="gRPC" 
                              stroke="#10b981" 
                              strokeWidth={3} 
                              dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
                              activeDot={{ r: 7, fill: "#10b981" }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="GraphQL" 
                              stroke="#f59e0b" 
                              strokeWidth={3} 
                              dot={{ fill: "#f59e0b", strokeWidth: 2, r: 5 }}
                              activeDot={{ r: 7, fill: "#f59e0b" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>

                  <div className="w-full">
                    <h4 className="font-medium text-gray-900 mb-4 text-center sm:text-left">{t('research.performance.concurrent.responseTime.nestedData')}</h4>
                    <div className="w-full max-w-full h-[350px] sm:h-[400px] min-h-[350px] mx-auto overflow-hidden">
                      <ChartContainer config={chartConfig} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%" minHeight={350}>
                          <LineChart 
                            data={responseTimeNestedData} 
                            margin={{ top: 20, right: 10, left: 10, bottom: 60 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                              dataKey="requests" 
                              label={{ value: t('research.performance.charts.concurrentRequests'), position: 'insideBottom', offset: -10 }}
                              tick={{ fontSize: 11 }}
                              stroke="#6b7280"
                            />
                            <YAxis 
                              label={isMobile ? undefined : { value: t('research.performance.charts.responseTimeMs'), angle: -90, position: 'insideLeft' }}
                              tick={{ fontSize: 11 }}
                              stroke="#6b7280"
                              width={isMobile ? 35 : 60}
                            />
                            <ChartTooltip content={<ResponseTimeTooltip />} />
                            <Legend 
                              wrapperStyle={{ paddingTop: '20px' }}
                              iconType="circle"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="REST" 
                              stroke="#3b82f6" 
                              strokeWidth={3} 
                              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                              activeDot={{ r: 7, fill: "#3b82f6" }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="gRPC" 
                              stroke="#10b981" 
                              strokeWidth={3} 
                              dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
                              activeDot={{ r: 7, fill: "#10b981" }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="GraphQL" 
                              stroke="#f59e0b" 
                              strokeWidth={3} 
                              dot={{ fill: "#f59e0b", strokeWidth: 2, r: 5 }}
                              activeDot={{ r: 7, fill: "#f59e0b" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>
                </div>

                {/* Key Findings */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">{t('research.performance.concurrent.keyFindings.responseTime.title')}</h4>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>
                      • <strong>{t('research.performance.concurrent.keyFindings.responseTime.simpleData')}</strong>
                    </li>
                    <li>
                      • <strong>{t('research.performance.concurrent.keyFindings.responseTime.complexData')}</strong>
                    </li>
                  </ul>
                </div>

                {/* CPU Utilization Charts */}
                <div className="space-y-6">
                  <div className="w-full overflow-hidden">
                    <h4 className="font-medium text-gray-900 mb-4 text-center sm:text-left">{t('research.performance.concurrent.cpuUtilization.flatData')}</h4>
                    <div className="w-full max-w-full h-[350px] sm:h-[400px] min-h-[350px] mx-auto overflow-hidden">
                      <ChartContainer config={chartConfig} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%" minHeight={350}>
                          <LineChart 
                            data={cpuUtilizationFlatData} 
                            margin={{ top: 20, right: 10, left: 10, bottom: 60 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                              dataKey="requests" 
                              label={{ value: t('research.performance.charts.concurrentRequests'), position: 'insideBottom', offset: -10 }}
                              tick={{ fontSize: 12 }}
                              stroke="#6b7280"
                            />
                            <YAxis 
                              label={isMobile ? undefined : { value: t('research.performance.charts.cpuUtilizationPercent'), angle: -90, position: 'insideLeft' }}
                              tick={{ fontSize: 12 }}
                              stroke="#6b7280"
                              width={isMobile ? 35 : 60}
                            />
                            <ChartTooltip content={<CpuTooltip />} />
                            <Legend 
                              wrapperStyle={{ paddingTop: '20px' }}
                              iconType="circle"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="REST" 
                              stroke="#3b82f6" 
                              strokeWidth={3} 
                              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                              activeDot={{ r: 7, fill: "#3b82f6" }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="gRPC" 
                              stroke="#10b981" 
                              strokeWidth={3} 
                              dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
                              activeDot={{ r: 7, fill: "#10b981" }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="GraphQL" 
                              stroke="#f59e0b" 
                              strokeWidth={3} 
                              dot={{ fill: "#f59e0b", strokeWidth: 2, r: 5 }}
                              activeDot={{ r: 7, fill: "#f59e0b" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>

                  <div className="w-full overflow-hidden">
                    <h4 className="font-medium text-gray-900 mb-4 text-center sm:text-left">{t('research.performance.concurrent.cpuUtilization.nestedData')}</h4>
                    <div className="w-full max-w-full h-[350px] sm:h-[400px] min-h-[350px] mx-auto overflow-hidden">
                      <ChartContainer config={chartConfig} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%" minHeight={350}>
                          <LineChart 
                            data={cpuUtilizationNestedData} 
                            margin={{ top: 20, right: 10, left: 10, bottom: 60 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                              dataKey="requests" 
                              label={{ value: t('research.performance.charts.concurrentRequests'), position: 'insideBottom', offset: -10 }}
                              tick={{ fontSize: 12 }}
                              stroke="#6b7280"
                            />
                            <YAxis 
                              label={isMobile ? undefined : { value: t('research.performance.charts.cpuUtilizationPercent'), angle: -90, position: 'insideLeft' }}
                              tick={{ fontSize: 12 }}
                              stroke="#6b7280"
                              width={isMobile ? 35 : 60}
                            />
                            <ChartTooltip content={<CpuTooltip />} />
                            <Legend 
                              wrapperStyle={{ paddingTop: '20px' }}
                              iconType="circle"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="REST" 
                              stroke="#3b82f6" 
                              strokeWidth={3} 
                              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                              activeDot={{ r: 7, fill: "#3b82f6" }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="gRPC" 
                              stroke="#10b981" 
                              strokeWidth={3} 
                              dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
                              activeDot={{ r: 7, fill: "#10b981" }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="GraphQL" 
                              stroke="#f59e0b" 
                              strokeWidth={3} 
                              dot={{ fill: "#f59e0b", strokeWidth: 2, r: 5 }}
                              activeDot={{ r: 7, fill: "#f59e0b" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">{t('research.performance.concurrent.keyFindings.cpuUtilization.title')}</h4>
                  <ul className="text-green-800 space-y-1 text-sm">
                    <li>
                      • <strong>{t('research.performance.concurrent.keyFindings.cpuUtilization.simpleData')}</strong>
                    </li>
                    <li>
                      • <strong>{t('research.performance.concurrent.keyFindings.cpuUtilization.complexData')}</strong>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Consecutive Requests Evaluation */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('research.performance.sustained.title')}
                </h3>

                <div className="grid grid-cols-1 gap-6">
                  <div className="w-full overflow-hidden">
                    <h4 className="font-medium text-gray-900 mb-4 text-center sm:text-left">{t('research.performance.sustained.responseTime.flatData')}</h4>
                    <div className="w-full max-w-full h-[300px] sm:h-[350px] min-h-[300px] mx-auto overflow-hidden">
                      <ChartContainer config={chartConfig} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                          <BarChart 
                            data={consecutiveResponseTimeFlat} 
                            margin={{ top: 20, right: 10, left: 10, bottom: 60 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                              dataKey="requests" 
                              tick={{ fontSize: 12 }}
                              stroke="#6b7280"
                            />
                            <YAxis 
                              label={isMobile ? undefined : { value: t('research.performance.charts.responseTimeMs'), angle: -90, position: 'insideLeft' }}
                              tick={{ fontSize: 12 }}
                              stroke="#6b7280"
                              width={isMobile ? 35 : 60}
                            />
                            <ChartTooltip content={<ResponseTimeTooltip />} />
                            <Legend 
                              wrapperStyle={{ paddingTop: '20px' }}
                              iconType="rect"
                            />
                            <Bar dataKey="REST" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                            <Bar dataKey="gRPC" fill="#10b981" radius={[2, 2, 0, 0]} />
                            <Bar dataKey="GraphQL" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>

                  <div className="w-full overflow-hidden">
                    <h4 className="font-medium text-gray-900 mb-4 text-center sm:text-left">{t('research.performance.sustained.responseTime.nestedData')}</h4>
                    <div className="w-full max-w-full h-[300px] sm:h-[350px] min-h-[300px] mx-auto overflow-hidden">
                      <ChartContainer config={chartConfig} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                          <BarChart 
                            data={consecutiveResponseTimeNested} 
                            margin={{ top: 20, right: 10, left: 10, bottom: 60 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                              dataKey="requests" 
                              tick={{ fontSize: 12 }}
                              stroke="#6b7280"
                            />
                            <YAxis 
                              label={isMobile ? undefined : { value: 'Response Time (ms)', angle: -90, position: 'insideLeft' }}
                              tick={{ fontSize: 12 }}
                              stroke="#6b7280"
                              width={isMobile ? 35 : 60}
                            />
                            <ChartTooltip content={<ResponseTimeTooltip />} />
                            <Legend 
                              wrapperStyle={{ paddingTop: '20px' }}
                              iconType="rect"
                            />
                            <Bar dataKey="REST" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                            <Bar dataKey="gRPC" fill="#10b981" radius={[2, 2, 0, 0]} />
                            <Bar dataKey="GraphQL" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>

                  <div className="w-full overflow-hidden">
                    <h4 className="font-medium text-gray-900 mb-4 text-center sm:text-left">Consecutive CPU Utilization - Flat Data</h4>
                    <div className="w-full max-w-full h-[300px] sm:h-[350px] min-h-[300px] mx-auto overflow-hidden">
                      <ChartContainer config={chartConfig} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                          <BarChart 
                            data={consecutiveCpuFlat} 
                            margin={{ top: 20, right: 10, left: 10, bottom: 60 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                              dataKey="requests" 
                              tick={{ fontSize: 12 }}
                              stroke="#6b7280"
                            />
                            <YAxis 
                              label={isMobile ? undefined : { value: 'CPU Utilization (%)', angle: -90, position: 'insideLeft' }}
                              tick={{ fontSize: 12 }}
                              stroke="#6b7280"
                              width={isMobile ? 35 : 60}
                            />
                            <ChartTooltip content={<CpuTooltip />} />
                            <Legend 
                              wrapperStyle={{ paddingTop: '20px' }}
                              iconType="rect"
                            />
                            <Bar dataKey="REST" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                            <Bar dataKey="gRPC" fill="#10b981" radius={[2, 2, 0, 0]} />
                            <Bar dataKey="GraphQL" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">{t('research.performance.sustained.results.title')}</h4>
                  <ul className="text-purple-800 space-y-1 text-sm">
                    <li>
                      • <strong>{t('research.performance.sustained.results.point1')}</strong>
                    </li>
                    <li>
                      • <strong>{t('research.performance.sustained.results.point2')}</strong>
                    </li>
                    <li>
                      • <strong>{t('research.performance.sustained.results.point3')}</strong>
                    </li>
                    <li>
                      • <strong>{t('research.performance.sustained.results.point4')}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conclusion */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>{t('research.findings.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('research.findings.paragraph1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('research.findings.paragraph2')}
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">{t('research.findings.recommendations.title')}</h4>
                <ul className="text-yellow-800 space-y-1 text-sm">
                  <li>
                    • <strong>gRPC:</strong> {t('research.findings.recommendations.grpc')}
                  </li>
                  <li>
                    • <strong>REST:</strong> {t('research.findings.recommendations.rest')}
                  </li>
                  <li>
                    • <strong>GraphQL:</strong> {t('research.findings.recommendations.graphql')}
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Support Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center space-x-3 text-blue-800">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl">{t('research.support.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="space-y-3">
                <p className="text-blue-800 leading-relaxed font-medium">
                  {t('research.support.subtitle')}
                </p>
                <p className="text-blue-600 text-sm leading-relaxed">
                  {t('research.support.description')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 px-8"
                  onClick={() => window.open('https://buymeacoffee.com/jakubowskif', '_blank')}
                >
                    <Coffee className="mr-2 h-4 w-4" />
                  {t('research.support.buyMeCoffee')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 px-8"
                  onClick={() => window.open('https://www.linkedin.com/in/mateusz-jakubowski-334827239/', '_blank')}
                >
                    <Users className="mr-2 h-4 w-4" />
                  {t('research.support.connectLinkedIn')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* References */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>{t('research.references.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-1 gap-3">
                  {displayedReferences.map((reference, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {reference}
                    </p>
                  ))}
                </div>
                <div className="flex justify-center pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowAllReferences(!showAllReferences)}
                    className="flex items-center space-x-2"
                  >
                    {showAllReferences ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        <span>{t('research.references.showLess')}</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        <span>{t('research.references.showMore', { count: allReferences.length })}</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-8 border-t border-gray-200 pt-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              {t('research.footer.createdBy')}{' '}
              <a 
                href="https://www.linkedin.com/in/mateusz-jakubowski-334827239/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black hover:text-blue-800 font-medium hover:underline transition-colors duration-200"
              >
                Mateusz Jakubowski
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
