'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Github } from 'lucide-react'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js'

import { getProject } from '@/actions/project'
import { Button } from '@/components/ui/button'

interface ProjectPageProps {
  params: {
    id: string
  }
}

const ProjectPage = ({ params }: ProjectPageProps) => {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      const projectData = await getProject(params.id)
      setProject(projectData)
    }
    fetchProject()
  }, [params.id])

  useEffect(() => {
    if (project) {
      document.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el as HTMLElement)
      })
    }
  }, [project])

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-full w-full p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Button onClick={() => router.back()} size="icon" variant="ghost">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col gap-y-1">
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-sm text-muted-foreground">
              {project.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <Button size="icon" variant="ghost">
            <Github className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-center gap-x-4">
          <div className="relative h-32 w-32 overflow-hidden rounded-xl">
            <Image
              fill
              src={project.imageUrl}
              alt={project.name}
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <pre className="relative rounded-lg bg-gray-50 p-4">
          <code className="language-typescript">
            {project.code}
          </code>
        </pre>
      </div>
    </div>
  )
}

export default ProjectPage