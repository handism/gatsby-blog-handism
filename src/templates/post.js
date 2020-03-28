import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import kebabCase from "lodash/kebabCase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import {
  EmailShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  PocketShareButton,
  TwitterShareButton,
} from "react-share"

import {
  EmailIcon,
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
  PinterestIcon,
  PocketIcon,
  TwitterIcon,
} from "react-share"

export default ({ data, pageContext }) => {
  const post = data.markdownRemark
  library.add(fas) // FontAwesomeのライブラリ読み込み
  return (
    <Layout tags={pageContext.tags}>
      <div class="content-sidebar-wrap">
        <div class="content">
          <div class="entry">
            <div class="entry-title">
              <h1>{post.frontmatter.title}</h1>
            </div>
            <div class="entry-meta">
              <span class="time">
                <FontAwesomeIcon icon={["fas", "clock"]} />
                <time class="entry-time">{pageContext.birthTime}</time>
              </span>
              <span class="time">
                <FontAwesomeIcon icon={["fas", "history"]} />
                <time class="entry-modified-time">
                  {pageContext.changeTime}
                </time>
              </span>

              <div class="tags">
                {post.frontmatter.tags.map(tag => (
                  <span class="tag">
                    <FontAwesomeIcon icon={["fas", "tag"]} />
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </span>
                ))}
              </div>
            </div>

            <div class="thumbnail">
              <Image filename={post.frontmatter.thumbnail} />
            </div>

            <div class="table-of-contents">
              <div class="toc-title">目次</div>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.tableOfContents,
                }}
              />
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />

            {/* <div class="share">
              <span class="share-icon">
                <EmailShareButton url={window.location.href}>
                  <EmailIcon size={50} round />
                </EmailShareButton>
              </span>
              <span class="share-icon">
                <PocketShareButton url={window.location.href}>
                  <PocketIcon size={50} round />
                </PocketShareButton>
              </span>
              <span class="share-icon">
                <TwitterShareButton url={window.location.href}>
                  <TwitterIcon size={50} round />
                </TwitterShareButton>
              </span>
              <span class="share-icon">
                <FacebookShareButton url={window.location.href}>
                  <FacebookIcon size={50} round />
                </FacebookShareButton>
              </span>
              <span class="share-icon">
                <LineShareButton url={window.location.href}>
                  <LineIcon size={50} round />
                </LineShareButton>
              </span>
              <span class="share-icon">
                <LinkedinShareButton url={window.location.href}>
                  <LinkedinIcon size={50} round />
                </LinkedinShareButton>
              </span>
              <span class="share-icon">
                <PinterestShareButton url={window.location.href}>
                  <PinterestIcon size={50} round />
                </PinterestShareButton>
              </span>
            </div> */}

            <div class="pagination">
              {pageContext.prev && (
                <Link to={pageContext.prev.fields.slug}>
                  &lt;&lt;{pageContext.prev.frontmatter.title}
                </Link>
              )}

              {pageContext.next && (
                <Link to={pageContext.next.fields.slug}>
                  {pageContext.next.frontmatter.title}&gt;&gt;
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents
      frontmatter {
        title
        tags
        category
        thumbnail
      }
    }
  }
`
