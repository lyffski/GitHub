import * as React from 'react'
import styled from 'styled-components'
import Container from 'theme/atoms/Container'
import Layout from 'containers/Layout'
import theme from 'theme'
import BuyBox from './BuyBox/BuyBox'
import BundelerWidget from './BundlerWidget/BundlerWidget'
import { ms } from 'modules/browser/const'
import ProductListWrapper from './ProductListWrapper'
import useBundledProducts from './hooks/useBundledProducts'
import useTranslations from 'hooks/useTranslations'
import withTranslations from './withTranslations'

export function OneToOneBundle() {
  const bundler = useBundledProducts()
  const t = useTranslations<'templates-OneToOneBundle'>()

  return (
    <Layout>
      <Container>
        <Wrapper data-cy-ctx="templates/OneToOneBundle">
          <div className="configurator">
            <h1>{t('page_headline')}</h1>
            <div className="row">
              <BundelerWidget
                product={bundler.firstProduct}
                setProduct={bundler.setFirstProduct}
                showDelete={
                  bundler.firstProduct && bundler.secondProduct ? true : false
                }
                trigger={bundler.trigger}
                setTrigger={bundler.setTrigger}
                startedFrom={bundler.startedFrom}
                index={0}
              />
              <div className="plus"></div>
              <BundelerWidget
                product={bundler.secondProduct}
                setProduct={bundler.setSecondProduct}
                showDelete={true}
                trigger={bundler.trigger}
                setTrigger={bundler.setTrigger}
                startedFrom={bundler.startedFrom}
                index={1}
              />
            </div>
            {bundler.firstProduct && bundler.secondProduct && (
              <div className="buy-box" data-cy-state="show-buy-box">
                <div className="divider"></div>
                <BuyBox
                  firstProduct={bundler.firstProduct}
                  secondProduct={bundler.secondProduct}
                  startedFrom={bundler.startedFrom}
                />
              </div>
            )}
          </div>
          {bundler.firstProduct ||
          bundler.secondProduct ||
          bundler.showDefaults ? (
            <div id={'products'} data-cy-state="show-productlist">
              <ProductListWrapper
                onProductWidgetClick={(product) => {
                  !bundler.firstProduct
                    ? bundler.setFirstProduct(product.sku)
                    : bundler.setSecondProduct(product.sku)
                  bundler.setTrigger(!bundler.trigger)
                }}
                linkTo={'/one-to-one-bundle/#'}
              />
            </div>
          ) : (
            <></>
          )}
        </Wrapper>
      </Container>
    </Layout>
  )
}

export default withTranslations(OneToOneBundle)

const Wrapper = styled.div`
  > .configurator {
    margin-top: ${theme.spacing('l')};
    text-align: center;
    padding-top: ${theme.spacing('l')};
    padding-bottom: ${theme.spacing('l')};
    margin-bottom: ${theme.spacing('l')};
    background-color: ${theme.colors.shade.primaryUltraBright};

    @media (min-width: ${ms.LG}px) {
      padding: 26px 30px 40px 30px;
    }

    > h1 {
      ${theme.ty('rc-2xl')}
      color: ${theme.colors.b0};
      margin-bottom: 22px;
    }

    > .row {
      @media (min-width: ${ms.LG}px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      > .plus {
        display: inline-block;
        min-width: 40px;
        height: 40px;
        background: linear-gradient(${theme.colors.brand.lusini} 0 0),
          linear-gradient(${theme.colors.brand.lusini} 0 0);
        background-position: center;
        background-size: 100% 4px, 4px 100%;
        background-repeat: no-repeat;
        margin-top: ${theme._spacing.xs}px;
        margin-bottom: ${theme._spacing.xs}px;

        @media (min-width: ${ms.LG}px) {
          margin-left: ${theme.spacing('m')};
          margin-right: ${theme.spacing('m')};
        }
      }
    }

    > .buy-box {
      > .divider {
        border-top: 1px solid ${theme.colors.shade.b2};
        margin: ${theme.spacing('m')};

        @media (min-width: ${ms.LG}px) {
          margin: 0;
          margin-top: ${theme.spacing('l')};
        }
      }
    }
  }
`
