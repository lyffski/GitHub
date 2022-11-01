//custom tailor
import * as React from 'react'
import styled from 'styled-components'
import { ms } from 'modules/browser/const'
import Layout from 'containers/Layout'
import Container from 'theme/atoms/Container'
import Gallery from './Gallery'
import InformationBox from './InformationBox'
import BuyBox from './BuyBox'
import { useInitializer, useDisplayVariant } from 'modules/productDetail'
import theme from 'theme'
import SimpleReactLightbox from 'simple-react-lightbox'
import { Crumb } from 'theme/atoms/Breadcrumbs'
import { createCrumbsFromCategoryTree } from 'utils/createCrumbs'
import Seo from 'theme/atoms/SEO'
import ProductSlider from 'theme/molecules/ProductSlider'
import fetchBySku from 'utils/productListFetcher/bySku'
import config from 'config'
import withTranslations from './withTranslations'
import useTranslations from 'hooks/useTranslations'
import pdpLdJson from './pdpLdJson'
import { Helmet } from 'react-helmet'
import FilterDrawer from './FilterDrawer'

type Props = {
  '*': string
  location: {
    pathname: string
    origin: string
  }
  pageContext: {
    hrefLang: {
      url: string
      locale: string
    }[]
    brandPath: string
  }
}

const MemoLayout = React.memo(Layout)

export function PDP(props: Props) {
  const t = useTranslations<'templates-PDP'>()
  const [containerID] = props['*'].split('-').reverse()
  const filter = React.useMemo(() => ({ containerID }), [containerID])
  useInitializer(filter, true)
  const variant = useDisplayVariant()
  const [showFilterDrawer, setShowFilterDrawer] = React.useState(false)

  React.useEffect(() => {
    window?.scrollTo(0, 0)
  }, [])

  const crumbs: Crumb[] = React.useMemo(() => {
    return createCrumbsFromCategoryTree(
      variant.data.mainCategory || variant.data.categories,
      variant.data.title
    )
  }, [variant.data])

  const pathArray = React.useMemo(() => {
    return Object.values(variant.data.mainCategory)[
      Object.keys(variant.data.mainCategory).length - 1
    ]
  }, [variant.data.mainCategory])
  const pdpLdJsonscript = React.useMemo(() => {
    return pdpLdJson(variant.data, config.i18n.currency_ISO)
  }, [variant.data])
  return (
    <MemoLayout
      key={containerID}
      breadcrumbs={crumbs}
      isFetching={!!variant.data.isDummy}
    >
      {props.location.origin && (
        <span data-cy-state="has-seo">
          <Seo
            canonicalUrl={`${props.location.origin}/${config.locale}/pdp/${containerID}/`}
            title={
              !variant.data.isDummy
                ? variant.data.title
                : 'Gastronomiebedarf | Schnell und einfach online'
            }
            description={
              !variant.data.isDummy
                ? variant.data.subtitle
                : 'Alles, was Gastgeber brauchen. 40.000 Artikel unter einem Dach. Service & Beratung. Kauf ohne Risiko. Profiqualität, faire Preise.'
            }
            type="article"
            noFollow={config.features.seoNoFollow}
            breadcrumbs={crumbs}
            location={props.location}
            product={variant.data}
            hrefLang={props.pageContext.hrefLang.map((row) => ({
              url: row.url + containerID + '/',
              locale: row.locale,
            }))}
          />
        </span>
      )}

      {!variant.data.isDummy && (
        /* eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state */
        <Helmet>
          <script
            data-react-helmet="true"
            id="pdpLd"
            type="application/ld+json"
          >
            {JSON.stringify(pdpLdJsonscript)}
          </script>
        </Helmet>
      )}

      <Container>
        <Wrapper
          data-cy-ctx="templates/PDP"
          data-cy-state={variant.data.isDummy && 'is-dummy'}
        >
          <SimpleReactLightbox>
            <Gallery path={pathArray?.[0] || ''} />
          </SimpleReactLightbox>
          <div className="sticky-wrapper">
            <BuyBox
              openFilterDrawer={() => setShowFilterDrawer(true)}
              brandPath={props.pageContext.brandPath}
            />
          </div>
          <InformationBox productPath={pathArray?.[0] || ''} />
          {variant.data.related?.crossSells.length > 0 && (
            <div
              className={'SliderCrosssell'}
              data-cy-state={'slider-crosssells-shown'}
            >
              <ProductSlider
                title={t('productSlider_related_to')}
                fetchFn={fetchBySku(variant.data.related.crossSells, 20)}
                maxProducts={
                  variant.data.related.crossSells.length < 20
                    ? variant.data.related.crossSells.length
                    : 20
                }
                listname={'pdpCrosssell'}
              />
            </div>
          )}
          {showFilterDrawer && (
            <FilterDrawer
              onClose={() => setShowFilterDrawer(false)}
              data-cy-state="filterdrawer-visible"
            />
          )}
        </Wrapper>
      </Container>
    </MemoLayout>
  )
}

export default withTranslations(PDP)

const Wrapper = styled.div`
  display: grid;
  grid:
    'Gallery'
    'BuyBox'
    'InformationBox'
    'SliderCrosssell'
    / 1fr;
  grid-column-gap: ${theme.spacing('m')};
  grid-row-gap: ${theme.spacing('ml')};

  @media (min-width: ${ms.MD}px) {
    grid:
      'Gallery        BuyBox'
      'InformationBox BuyBox'
      'SliderCrosssell SliderCrosssell'
      / 1fr 1fr;
    grid-column-gap: ${theme.spacing('m')};
    grid-row-gap: ${theme.spacing('m')};
  }
  @media (min-width: ${ms.LG}px) {
    grid:
      'Gallery        BuyBox'
      'InformationBox BuyBox'
      'SliderCrosssell SliderCrosssell'
      / 3fr 2fr;
    grid-column-gap: ${theme.spacing('m')};
    grid-row-gap: ${theme.spacing('m')};
  }

  @media (min-width: ${ms.XL}px) {
    grid:
      'Gallery       BuyBox' auto
      'InformationBox BuyBox'
      'SliderCrosssell SliderCrosssell'
      /2fr 1fr;
    grid-column-gap: ${theme.spacing('xl')};
    grid-row-gap: ${theme.spacing('l')};
  }

  > .Gallery {
    grid-area: Gallery;
  }

  > .sticky-wrapper {
    height: 100%;
    grid-area: BuyBox;
    > .BuyBox {
      position: sticky;
      top: ${theme.spacing('s')};
    }
  }

  > .InformationBox {
    grid-area: InformationBox;
  }

  > .SliderCrosssell {
    grid-area: SliderCrosssell;
  }
`
