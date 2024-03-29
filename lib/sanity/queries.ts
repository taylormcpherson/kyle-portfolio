import { client } from "./sanity";

export interface ProjectLinkProps {
  host: string;
  url: string;
  text?: string;
}

export type SanityTagVariants = "sql" | "excel" | "r" | "tableau" | "python";

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  tags: SanityTagVariants[];
  links: ProjectLinkProps[];
  imageUrl: string;
  imageAlt?: string;
  publishedAt?: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
}

export const getProject = async (slug: string): Promise<Project> => {
  const query = `
    *[_type == "project" && slug.current == "${slug}"] {
      'slug': slug.current,
      title,
      subtitle,
      tags,
      links,
      'imageUrl': image.asset->url,
      'imageAlt': image.asset->alt,
      publishedAt,
      body,
      metaTitle,
      metaDescription,
    }
  `;

  const project = await client.fetch(query);
  return project[0];
};

export interface ProjectPreview {
  slug: string;
  title: string;
  subtitle: string;
  tags: SanityTagVariants[];
  publishedAt?: string;
  imageUrl: string;
  imageAlt?: string;
}

export const getAllProjects = async (): Promise<ProjectPreview[]> => {
  const query = `
    *[_type == "project"] {
      'slug': slug.current,
      title,
      subtitle,
      tags,
      publishedAt,
      'imageUrl': image.asset->url,
      'imageAlt': image.asset->alt,
      _updatedAt
    } | order(publishedAt desc)
  `;

  const allProjects = await client.fetch(query);
  return allProjects;
};

export const getProjectSlugs = async (): Promise<{ slug: string }[]> => {
  const query = `
    *[_type == "project"] {
      'slug': slug.current,
    }
  `;

  const allProjectSlugs = await client.fetch(query);
  return allProjectSlugs;
};

export interface Page {
  slug: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
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
  `;

  const page = await client.fetch(query);
  return page[0];
};
