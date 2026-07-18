'use client'

import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { absoluteUrl, type BreadcrumbItem as Crumb } from '@/lib/seo'
import { cn } from '@/lib/utils'
import { Fragment } from 'react'

type PageBreadcrumbsProps = {
  items: Crumb[]
  /** Dark gradient heroes use onDark; light/gallery/blog use onLight */
  variant?: 'onDark' | 'onLight'
  className?: string
}

export default function PageBreadcrumbs({
  items,
  variant = 'onDark',
  className,
}: PageBreadcrumbsProps) {
  if (!items?.length) return null

  const isDark = variant === 'onDark'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href || '/'),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumb className={cn('mb-4 sm:mb-6', className)}>
        <BreadcrumbList
          className={cn(
            'text-xs sm:text-sm',
            isDark ? 'text-white/75' : 'text-muted-foreground'
          )}
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <Fragment key={`${item.label}-${index}`}>
                {index > 0 && (
                  <BreadcrumbSeparator
                    className={cn(isDark ? 'text-white/50' : 'text-muted-foreground/60')}
                  />
                )}
                <BreadcrumbItem>
                  {isLast || !item.href ? (
                    <BreadcrumbPage
                      className={cn(
                        'font-medium',
                        isDark ? 'text-white' : 'text-foreground'
                      )}
                    >
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          isDark
                            ? 'text-white/75 hover:text-white'
                            : 'hover:text-foreground'
                        )}
                      >
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}
