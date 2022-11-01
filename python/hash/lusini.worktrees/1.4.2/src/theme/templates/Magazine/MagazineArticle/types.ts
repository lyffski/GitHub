export type Props = {
  location: {
    pathname: string
    origin: string
  }
  data: {
    magazineArticle: {
      seoTitle: string
      title: string
      teaser: string
      seoDescription: string
      contentfulID: string
      canonicalUrl: string
      story: any
      hrefLang: {
        url: string
        locale: string
      }[]
      relatedArticles: {
        fields: {
          active: boolean
          slug: string
          title: string
          teaserImageUrl: {
            original_secure_url: string
          }
        }
      }[]
    }
  }
}

export type PreviewProps = {
  fields: {
    seoTitle: string
    title: string
    teaser: string
    seoDescription: string
    contentfulID: string
    canonicalUrl: string
    story: any
    hrefLang: {
      url: string
      locale: string
    }[]
    relatedArticles: {
      fields: {
        active: boolean
        slug: string
        title: string
        teaserImageUrl: {
          original_secure_url: string
        }
      }
    }[]
  }
}
