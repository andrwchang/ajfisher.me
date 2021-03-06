import { Link, useStaticQuery, graphql} from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import Img from 'gatsby-image';

import { device } from './devices';
import { getPostImages, ImageLink } from './list';
import { pathDate } from '../lib/utils';

const StyledFooter = styled.footer`
  box-sizing: border-box;
  border-top: 2px solid var(--highlight);
  margin: 0;
  padding-bottom: var(--gutter);

  /** Put the background gradient in**/
  background: var(--darkened-grey);
  background: -moz-radial-gradient(circle, var(--dark-grey) 0%, var(--darkened-grey) 100% );
  background: -webkit-radial-gradient(circle, var(--dark-grey) 0%, var(--darkened-grey) 100% );
  background: radial-gradient(circle, var(--dark-grey) 0%, var(--darkened-grey) 100% );

  & ::selection {
    background: var(--base);
  }
`;

export const FooterImageLink = styled(ImageLink)`
  border-bottom: 0.5rem solid var(--highlight);
  border-radius: 0.2rem;

  :hover {
    border-bottom: 0.5rem solid var(--base);
  }
`;

const FooterContainer = styled.div`
  margin:0;
  width: 100vw;
  padding-top: 0rem;

  color: var(--light-text-colour);

  @media only screen and ${device.medium} {
  }

  @media only screen and ${device.large} {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: space-between;

  }

  @media only screen and ${device.wide} {
    max-width: 1026px;
  }

  & section {
    padding: 0 var(--gutter);

    @media only screen and ${device.large} {
      align-self: flex-start;
      width: 30%;
    }

    & p {
      font-size: 2rem;
      margin: var(--gutter) 0;

      @media only screen and ${device.large} {
        margin: calc(0.5 * var(--gutter)) 0;
      }

      & a, & a:visited {
        background: none;
        padding: 0;
      }
    }

    & div {

      & a, & a:visited {
        background: none;
        padding: 0;
      }
    }

  }
`;

const Title = styled.h2`
  color: var(--highlight);
  font-size: 3rem;
  margin: var(--gutter) 0;

  @media only screen and ${device.large} {
    margin: calc(0.5 * var(--gutter)) 0;
  }
`;

const PostItem = ({title, image, url, excerpt}) => {

  const { postItemImages } = getPostImages();

  const postImage = postItemImages.edges.find(({node}) => {
    if (node.relativePath == image) return node;
  });

  return (
    <>
      <FooterImageLink>
        <Link to={url}>
          <Img
            fluid={postImage.node.childImageSharp.fluid}
            alt={title}
          />
        </Link>
      </FooterImageLink>
      <p><Link to={url}>{title}</Link></p>
      { excerpt.length > 0 &&
        <p>{excerpt}</p>
      }
    </>
  );
};

const Footer = ({slug}) => {

  const data = useStaticQuery(graphql`
    query footerImageQuery {
      responsiveDesign: file(relativePath: { eq: "posts/responsive_design.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }

      jsRobotics: file(relativePath: { eq: "posts/make_js_robots.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }

      jsFoo: file(relativePath: { eq: "posts/jsfoo.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }

      featuredPosts: allMarkdownRemark(filter: {frontmatter: {featured: {eq: true}}},
        sort: {fields: frontmatter___date, order: DESC})
        {
          edges {
            node {
              frontmatter {
                title
                date(formatString: "YYYY-MM-DD")
                listimage
                listimage_position
                excerpt
                featureimage
                featureimage_position
                slug
              }
            }
          }
        }
    }
  `);

  // get the featured article
  const featuredPosts = data.featuredPosts.edges.map((edge) => {
    return edge.node.frontmatter;
  });

  let featured = featuredPosts[0]; // latest

  // make sure we don't feature the current post on itself
  if (featured.slug === slug) {
    featured = featuredPosts[1]; // second latest
  }

  featured.url = `/${pathDate(featured.date)}/${featured.slug}/`;
  if (featured.listimage.startsWith('/img/')) {
    featured.listimage = featured.listimage.substring(5);
  }

  return (
    <StyledFooter>
      <FooterContainer>
        <section>
          <Title>Featured Post</Title>
          <PostItem url={featured.url} title={featured.title}
            excerpt={featured.excerpt} image={featured.listimage}
            imagePosition={featured.listimage_position} />
        </section>
        <section>
          <Title>Latest talk</Title>
          <FooterImageLink>
            <OutboundLink href="https://www.youtube.com/watch?v=3C3lHuRToQs">
              <Img
                fluid={data.jsFoo.childImageSharp.fluid}
                alt="YouTube - JSFoo, India"
              />
            </OutboundLink>
          </FooterImageLink>
          <p>
            <OutboundLink href="https://www.youtube.com/watch?v=3C3lHuRToQs">
              Droids, JavaScript and Web Connected Hardware, JSFoo, India
            </OutboundLink>
          </p>
          <p>
            Dive into the world of JS hardware and see the sorts of things
            people are doing with it with some demos along the way.
          </p>
        </section>
        <section>
          <Title>My books</Title>
          <FooterImageLink position="50% 100%">
            <OutboundLink href="http://www.amazon.com/JavaScript-Robotics-Johnny-Five-Raspberry-BeagleBone/dp/1457186950/">
              <Img
                fluid={data.jsRobotics.childImageSharp.fluid}
                alt="Make JavaScript Robotics Book Cover"
              />
            </OutboundLink>
          </FooterImageLink>
          <p>
            <OutboundLink href="http://www.amazon.com/JavaScript-Robotics-Johnny-Five-Raspberry-BeagleBone/dp/1457186950/">
              Make: JavaScript Robotics
            </OutboundLink>
          </p>
          <FooterImageLink position="50% 85%">
            <OutboundLink href="http://www.amazon.com/Jump-Start-Responsive-Web-Design-ebook/dp/B00TJ6UY9S/">
              <Img
                fluid={data.responsiveDesign.childImageSharp.fluid}
                alt="Jump Start Responsive Design Book Cover"
              />
            </OutboundLink>
          </FooterImageLink>
          <p>
            <OutboundLink href="http://www.amazon.com/Jump-Start-Responsive-Web-Design-ebook/dp/B00TJ6UY9S/">
              Jump Start Responsive Web Design
            </OutboundLink>
          </p>
        </section>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
