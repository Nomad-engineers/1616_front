'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Copy, Check, ExternalLink, Quote, Lightbulb, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface ArticleContentProps {
  content: any
  className?: string
}

export function ArticleContent({ content, className }: ArticleContentProps) {
  const [copiedCode, setCopiedCode] = useState<string>('')

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  return (
    <div className={cn('max-w-4xl mx-auto', className)}>
      <div className="prose prose-lg prose-gray max-w-none">
        {/* Article Content */}
        <div className="article-content">
          {renderLexicalContent(content, copyToClipboard, copiedCode)}
        </div>
      </div>

      {/* Article Actions */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Was this article helpful?</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">👍 Yes</Button>
              <Button variant="outline" size="sm">👎 No</Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Copy className="h-4 w-4" />
              Copy Link
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function renderLexicalContent(
  content: any,
  copyToClipboard: (text: string, id: string) => void,
  copiedCode: string
): React.ReactNode {
  if (!content) return null

  if (content.root && content.root.children) {
    return content.root.children.map((node: any, index: number) => {
      return renderLexicalNode(node, index, copyToClipboard, copiedCode)
    })
  }

  if (typeof content === 'string') {
    return <p>{content}</p>
  }

  return <pre>{JSON.stringify(content, null, 2)}</pre>
}

function renderLexicalNode(
  node: any,
  key: number,
  copyToClipboard: (text: string, id: string) => void,
  copiedCode: string
): React.ReactNode {
  switch (node.type) {
    case 'paragraph':
      return (
        <p key={key} className="mb-6 text-gray-700 leading-relaxed text-lg">
          {node.children?.map((child: any, childIndex: number) =>
            renderLexicalNode(child, childIndex, copyToClipboard, copiedCode)
          )}
        </p>
      )

    case 'heading':
      const Tag = `h${Math.min(node.tag || 1, 6)}` as keyof JSX.IntrinsicElements
      const headingId = `heading-${key}`
      return (
        <Tag
          key={key}
          id={headingId}
          className={cn(
            'font-bold mb-6 mt-8 scroll-mt-24',
            'text-gray-900 tracking-tight',
            {
              'text-3xl': node.tag === 1,
              'text-2xl': node.tag === 2,
              'text-xl': node.tag === 3,
              'text-lg': node.tag === 4,
              'text-base': node.tag === 5 || node.tag === 6
            }
          )}
        >
          {node.children?.map((child: any, childIndex: number) =>
            renderLexicalNode(child, childIndex, copyToClipboard, copiedCode)
          )}
        </Tag>
      )

    case 'text':
      let textContent = node.text
      let className = ''

      if (node.format & 1) { // Bold
        textContent = <strong key={key}>{textContent}</strong>
      }
      if (node.format & 2) { // Italic
        textContent = <em key={key}>{textContent}</em>
      }
      if (node.format & 4) { // Underline
        textContent = <u key={key}>{textContent}</u>
      }
      if (node.format & 8) { // Strikethrough
        textContent = <s key={key}>{textContent}</s>
      }

      return textContent

    case 'list':
      const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
      return (
        <ListTag
          key={key}
          className={cn(
            'mb-6 space-y-3',
            node.listType === 'bullet' ? 'list-disc pl-6' : 'list-decimal pl-6'
          )}
        >
          {node.children?.map((child: any, childIndex: number) => (
            <li
              key={childIndex}
              className="text-gray-700 leading-relaxed text-lg marker:text-blue-600"
            >
              {child.children?.map((grandChild: any, grandChildIndex: number) =>
                renderLexicalNode(grandChild, grandChildIndex, copyToClipboard, copiedCode)
              )}
            </li>
          ))}
        </ListTag>
      )

    case 'quote':
      return (
        <blockquote key={key} className="border-l-4 border-blue-600 pl-6 my-8 bg-blue-50 py-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Quote className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div className="text-lg italic text-gray-700 leading-relaxed">
              {node.children?.map((child: any, childIndex: number) =>
                renderLexicalNode(child, childIndex, copyToClipboard, copiedCode)
              )}
            </div>
          </div>
        </blockquote>
      )

    case 'code':
      const codeId = `code-${key}`
      const codeText = node.children?.[0]?.text || ''
      return (
        <div key={key} className="relative my-8">
          <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
            <code className="text-sm font-mono">{codeText}</code>
          </pre>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(codeText, codeId)}
            className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 text-white p-2"
          >
            {copiedCode === codeId ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      )

    case 'image':
      return (
        <div key={key} className="my-8">
          <Image
            src={node.src}
            alt={node.alt || ''}
            width={800}
            height={400}
            className="rounded-lg shadow-lg w-full object-cover"
          />
          {node.caption && (
            <p className="text-center text-sm text-gray-600 mt-2 italic">
              {node.caption}
            </p>
          )}
        </div>
      )

    case 'link':
      return (
        <Link
          key={key}
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
        >
          {node.children?.map((child: any, childIndex: number) =>
            renderLexicalNode(child, childIndex, copyToClipboard, copiedCode)
          )}
          <ExternalLink className="h-3 w-3 inline" />
        </Link>
      )

    // Custom block types
    case 'callout':
      const calloutTypes = {
        info: { icon: AlertCircle, bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' },
        tip: { icon: Lightbulb, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800' },
        warning: { icon: AlertCircle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800' }
      }

      const calloutType = calloutTypes[node.calloutType as keyof typeof calloutTypes] || calloutTypes.info
      const Icon = calloutType.icon

      return (
        <div
          key={key}
          className={cn(
            'flex gap-3 p-4 rounded-lg border my-6',
            calloutType.bg, calloutType.border
          )}
        >
          <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', calloutType.text)} />
          <div className={cn('text-sm leading-relaxed', calloutType.text)}>
            {node.children?.map((child: any, childIndex: number) =>
              renderLexicalNode(child, childIndex, copyToClipboard, copiedCode)
            )}
          </div>
        </div>
      )

    case 'divider':
      return <hr key={key} className="my-12 border-gray-300" />

    case 'table':
      return (
        <div key={key} className="my-8 overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            {node.children?.map((child: any, childIndex: number) => {
              if (child.type === 'table-row') {
                const isHeader = childIndex === 0
                const Tag = isHeader ? 'thead' : 'tbody'

                return (
                  <Tag key={childIndex}>
                    <tr className={isHeader ? 'bg-gray-50' : 'bg-white'}>
                      {child.children?.map((cell: any, cellIndex: number) => {
                        const CellTag = isHeader ? 'th' : 'td'
                        return (
                          <CellTag
                            key={cellIndex}
                            className={cn(
                              'px-6 py-3 text-sm',
                              isHeader
                                ? 'font-medium text-gray-900 text-left'
                                : 'text-gray-700'
                            )}
                          >
                            {cell.children?.map((grandChild: any, grandChildIndex: number) =>
                              renderLexicalNode(grandChild, grandChildIndex, copyToClipboard, copiedCode)
                            )}
                          </CellTag>
                        )
                      })}
                    </tr>
                  </Tag>
                )
              }
              return null
            })}
          </table>
        </div>
      )

    default:
      return null
  }
}