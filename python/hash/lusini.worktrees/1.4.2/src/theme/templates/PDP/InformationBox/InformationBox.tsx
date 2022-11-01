import * as React from 'react'
import styled from 'styled-components'
import Accordion from './Accordion'
import Faktor from 'assets/factor.svg'
import { ms } from 'modules/browser/const'
import { useDisplayVariant } from 'modules/productDetail'
import theme from 'theme'
import Download from 'assets/download.svg'
import config from 'config'
import Markdown from 'theme/atoms/Markdown'
import useTranslations from 'hooks/useTranslations'
import Button from 'theme/atoms/Button'
import B2cSwitch from 'theme/atoms/B2cSwitch'

type Props = {
  productPath: string
}
export default function InformationBox(props: Props) {
  const t = useTranslations<'templates-PDP'>()
  const variant = useDisplayVariant()
  const attributes = React.useMemo(() => {
    const labels: {
      label: string
      value?: string | number
    }[] = []
    const icons: { label: string; icon: string }[] = []

    Object.keys(variant.data.attributes).forEach((attributeKey) => {
      const values: string[] = []

      // skip attributes "WARRANTY_REPURCHASE" and is_pdp_attribute === false
      if (attributeKey === 'WARRANTY_REPURCHASE') return
      if (!variant.data.attributes[attributeKey].is_pdp_attribute) return

      variant.data.attributes[attributeKey].values.forEach((val) => {
        const keys = Object.keys(val)

        // get all attributes with icons
        if (keys.includes('icon')) {
          icons.push({
            label: val.value,
            icon: config.modules.cloudinary.endpoint + val.icon,
          } as {
            label: string
            icon: string
          })
        }

        // get all other attributes with no documents (e.g. energyLabel)
        else if (!keys.includes('document')) {
          if (keys.includes('unit') && keys.includes('value')) {
            const sorted_val = `${val.value} ${val.unit}`
            values.push(sorted_val)
          } else if (attributeKey !== 'PROPERTIES_PRODUCT') {
            values.push(Object.values(val).join(' '))
          }
        }
      })
      if (values.length > 0)
        labels.push({
          label: variant.data.attributes[attributeKey].label,
          value: values.join(', '),
        })
      if (attributeKey === 'PROPERTIES_PRODUCT') {
        labels.push({
          label: variant.data.attributes[attributeKey].label,
          value: variant.data.attributes[attributeKey].values
            .map((value) => value.value)
            .join(', '),
        })
      }
    })

    return {
      icons: icons,
      labels: labels,
    }
  }, [variant.data.attributes])

  const featureValues = variant.data.attributes.FEATURE?.values || []

  return (
    <Wrapper className="InformationBox" isFetching={!!variant.data.isDummy}>
      <div className="top">
        <div className="description-left">
          <div className="description">
            <Markdown html={variant.data.description} />
          </div>
        </div>
        <div className="additional-info">
          <B2cSwitch.B2B>
            {variant.data.specimen?.hasSpecimenProducts?.length > 0 && (
              <div className="hasSpecimen" data-cy-state>
                <Button
                  variation="secondary"
                  to={`/pdp/${variant.data.specimen.hasSpecimenProducts[0]}`}
                  fullWidth
                >
                  {t('pdp_article_has_specimen_text')}
                </Button>
              </div>
            )}
          </B2cSwitch.B2B>
          <div className="article-number">
            {t('pdp_article_number_text')}
            {variant.data.sku}
          </div>
          <ul className="usps">
            {featureValues.map((el, i) => (
              <li key={i}>
                <Faktor />
                {el.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="accordion-list">
        {attributes.icons.length > 0 && (
          <Accordion disableToggle data-cy-state="show-icons">
            <IconList>
              {attributes.icons.map((icon, i) => (
                <img
                  key={i}
                  alt={icon.label}
                  title={icon.label}
                  src={icon.icon}
                />
              ))}
            </IconList>
          </Accordion>
        )}
        {attributes.labels.length > 0 && (
          <Accordion
            label={t('product_informations')}
            productPath={props.productPath}
            productData={variant.data}
            data-cy-state="show-information-labels"
          >
            {attributes.labels.map((attribute, i) => (
              <InformationGrid key={'attributes' + i} role="rowgroup">
                <div className="flex-row" role="cell">
                  {attribute.label}
                </div>
                <div className="flex-row" role="cell">
                  {attribute.value}
                </div>
              </InformationGrid>
            ))}
          </Accordion>
        )}
        {variant.data.documents && variant.data.documents.length > 0 && (
          <Accordion data-cy-state="show-downloads" label={t('downloads')}>
            {variant.data.documents?.map((document) => {
              return (
                <DocumentWrapper key={document.title}>
                  {
                    <a
                      href={config.modules.cloudinary.endpoint + document.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download />
                      <span>{document.title}</span>
                    </a>
                  }
                </DocumentWrapper>
              )
            })}
          </Accordion>
        )}
      </div>
    </Wrapper>
  )
}

const DocumentWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  > a {
    > svg {
      height: 1.2rem;
      width: 1.2rem;
    }
    > span {
      margin-left: ${theme.spacing('s')};
    }
  }
`
const Wrapper = styled.div<{ isFetching: boolean }>`
  ${(props) =>
    props.isFetching &&
    `
      * {
          color: transparent !important;
          text-shadow: 0 0 0.9375rem rgba(0,0,0,0.5) !important;
      }
  `}
  > .top {
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: ${theme.spacing('ml')};
    @media (min-width: ${ms.XL}px) {
      flex-direction: row;
      margin-bottom: ${theme.spacing('l')};
    }
    > .description-left {
      flex: 1;
      > .description {
        flex: 1;
        ${theme.ty('r-s')}

        @media (min-width: ${ms.SM}px) {
          ${theme.ty('r-base')}
        }
      }
    }
    > .additional-info {
      min-width: 13.625rem;
      margin-bottom: ${theme.spacing('m')};
      ${theme.ty('rc-s')}
      > span > .hasSpecimen {
        margin-bottom: ${theme.spacing('ml')};
        > .secondary {
          padding: 0.625rem 3.25rem;
        }
      }
      @media (min-width: ${ms.SM}px) {
        ${theme.ty('rc-base')}
      }
      @media (min-width: ${ms.XL}px) {
        margin-left: 3.125rem;
        margin-bottom: 0;
      }
      > .article-number {
        background: ${theme.colors.shade.b6};
        text-align: center;
        width: 100%;
        padding: 0.625rem 0;
        margin-bottom: ${theme.spacing('m')};
      }

      > ul.usps {
        @media (min-width: ${ms.XL}px) {
          max-width: 15rem;
        }
        > li {
          margin-bottom: ${theme.spacing('s')};
          &:last-child {
            margin-bottom: 0;
          }
          display: flex;
          align-items: center;
          > svg {
            margin-right: 0.75rem;
            min-width: 1rem;
          }
        }
      }
    }
  }
`

const IconList = styled.div`
  display: flex;
  > img {
    margin: 0 ${theme.spacing('xxs')};
    width: 2.5rem;
    height: 2.5rem;
  }
`

const InformationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 50%);
  grid-template-rows: 100% auto;
  transition: 0.5s;
  &:nth-child(odd) > .flex-row {
    background: #f9f9f8;
  }
  > .flex-row {
    display: block;
    width: 100%;
    text-align: left;
    padding: ${theme.spacing('m')};
  }
`
