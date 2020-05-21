import React from 'react'

const ExternalLink: React.FC<{
  href: string
  title: string
  description: string
  link: string
  image: string
}> = ({ href, title, description, link, image }) => {
  return (
    <section className="elp-content-holder">
      <a href={href} className="external-link-preview">
        <div className="elp-description-holder">
          <h4 className="elp-title">{title}</h4>
          <div className="elp-description">{description}</div>
          <div className="elp-link">{link}</div>
        </div>
        {image ? (
          <div className="elp-image-holder">
            <img src={image} alt={title} />
          </div>
        ) : null}
      </a>
    </section>
  )
}

export default ExternalLink
