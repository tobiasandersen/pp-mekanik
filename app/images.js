'use client'

import Image from 'next/image'
import { useState } from 'react'
import Lightbox, {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

export function Images({ se, images }) {
  const [showMore, setShowMore] = useState(false)
  const [imageIndex, setImageIndex] = useState(null)

  return (
    <section className='images container--box waypoint-section' id='images'>
      <h2 id='selection-of-images'>
        {se ? 'Bilder i urval' : 'A selection of images'}
      </h2>
      <div className='images-container'>
        {images
          .slice(0, showMore ? images.length : 4)
          .map(({ link, width = 800, height = 600 }, index) => (
            <Image
              key={link}
              src={link}
              alt=''
              width={800}
              height={(height / width) * 800}
              onPointerDown={() => {
                setImageIndex(index)
              }}
            />
          ))}
      </div>
      {imageIndex != null && (
        <Lightbox
          open
          close={() => setImageIndex(null)}
          index={imageIndex}
          slides={images.map((image) => ({
            src: image.link,
            width: image.width,
            height: image.height,
            imageFit: 'contain',
            type: 'image',
          }))}
          render={{ slide: Img }}
        />
      )}
      <footer className='images-footer'>
        <button
          className='button'
          onClick={() => {
            setShowMore(!showMore)
          }}
        >
          {showMore && se
            ? 'Dölj bilder igen'
            : !showMore && se
              ? 'Visa fler bilder'
              : showMore
                ? 'Hide images'
                : 'Show more images'}
        </button>
      </footer>
    </section>
  )
}

function Img({ slide, offset, rect }) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps()

  const { currentIndex } = useLightboxState()
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit)

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width),
      )
    : rect.width

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height),
      )
    : rect.height

  return (
    <div style={{ position: 'relative', width, height }}>
      <Image
        fill
        alt=''
        src={slide}
        loading='eager'
        draggable={false}
        placeholder={slide.blurDataURL ? 'blur' : undefined}
        style={{
          objectFit: cover ? 'cover' : 'contain',
          cursor: click ? 'pointer' : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  )
}
