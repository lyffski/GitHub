export default `
    type Footer implements Node {
        serviceLinks: [ServicePage] @link
        aboutLinks: [ServicePage] @link
        legal: [ServicePage] @link
        facebook: String
        youtube: String
        instagram: String
        whatsapp: String
        pinterest: String
        linkedin: String
        xing: String
        advantages: [String]
        catalogImage: String
        catalogLink: String
        availablePayments: [String]
        newsletter: NewsletterFooter
    }
    type LandingPage implements Node {
        urlPath: String
        contentfulID: String
        title: String
        seoTitle: String
        seoDescription: String
        noIndex: Boolean
        hrefLang: [HrefLang]
        canonicalUrl: String
    }
    type MagazineArticle implements Node {
        seoTitle: String
        urlPath: String
        title: String
        teaser: String
        shortenedTeaser: String
        seoDescription: String
        contentfulID: String
        canonicalUrl: String
        hrefLang: [HrefLang]
        relatedArticles: [RelatedMagazineArticle]
        teaserImageUrl: String
    }
    type ServicePage implements Node {
        urlPath: String
        contentfulID: String
        title: String
        seoTitle: String
        seoDescription: String
        headline: String
        noIndex: Boolean
        parentPage: ServicePage @link(by: "contentfulID")
        childPages: [ServicePage] @link(by: "contentfulID")
    }
    type StaticBlock implements Node {
        contentfulID: String
        title: String
        description: String
        identifier: String
    }
    type TagCategory implements Node {
        tag: String
        contentfulID: String
        title: String
        canonicalUrl: String
        urlPath: String
        seoTitle: String
        seoDescription: String
        hrefLang: [HrefLang]
        categoryPath: String
    }
    type Category implements Node {
        canonicalUrl: String
        noIndex: Boolean
        filters: JSON
        hrefLang: [HrefLang]
        title: String
        seoTitle: String
        brand: String
        seoText: String
        seoDescription: String
        label: String
        path: String
        urlPath: String
        contentfulID: String
        hasSeries: Boolean
        objectID: String
        categoryLevel: Int
        position: Int
        childrenCategory: [Category]
        teaserImg: String
    }
    type Link {
        label: String
        link: String
    }
    type Navigation implements Node {
        sidebar: [Link]
    }

    type HrefLang {
        locale: String
        url: String
    }
    type RelatedMagazineArticle {
        fields: RelatedMagazineArticleFields
    }
    type RelatedMagazineArticleFields {
        active: Boolean
        slug: String
        title: String
        teaserImageUrl: [TeaserImageUrlRelatedArticle]
    }
    type TeaserImageUrlRelatedArticle {
        original_secure_url: String
    }
    type NewsletterFooter {
        title: String
        labels: [String]
        iconSrc: String
        disclaimer: String
    }
`
