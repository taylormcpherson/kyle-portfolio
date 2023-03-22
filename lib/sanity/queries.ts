import { client } from "./sanity"

export interface Project {
  slug: string
  title: string
  subtitle: string
  imageUrl: string
  imageAlt?: string
  publishedAt?: string
  body: string
  metaTitle: string
  metaDescription: string
}

export const getProject = async (slug: string): Promise<Project> => {
  const query = `
    *[_type == "project" && slug.current == "${slug}"] {
      'slug': slug.current,
      title,
      subtitle,
      'imageUrl': image.asset->url,
      'imageAlt': image.asset->alt,
      publishedAt,
      body,
      metaTitle,
      metaDescription,
    }
  `

  const project = await client.fetch(query)
  return project[0]
}

export interface ProjectPreview {
  slug: string
  title: string
  subtitle: string
  imageUrl: string
  imageAlt?: string
  publishedAt?: string
}

export const getAllProjects = async (): Promise<ProjectPreview[]> => {
  const query = `
    *[_type == "project"] {
      'slug': slug.current,
      title,
      subtitle,
      'imageUrl': image.asset->url,
      'imageAlt': image.asset->alt,
      publishedAt,
      _updatedAt
    } | order(_updatedAt desc)
  `

  const allProjects = await client.fetch(query)
  return allProjects
}

export const getProjectSlugs = async (): Promise<{ slug: string }[]> => {
  const query = `
    *[_type == "project"] {
      'slug': slug.current,
    }
  `

  const allProjectSlugs = await client.fetch(query)
  return allProjectSlugs
}

export interface Page {
  slug: string
  title: string
  subtitle: string
  metaTitle: string
  metaDescription: string
}

export const getPage = async (slug: string): Promise<Page> => {
  const query = `
    *[_type == "page" && slug == "${slug}"] {
      slug,
      title,
      subtitle,
      metaTitle,
      metaDescription,
    }
  `

  const page = await client.fetch(query)
  return page[0]
}
