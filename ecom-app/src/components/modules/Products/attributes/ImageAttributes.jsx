import React, { forwardRef, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import { useImage } from "@hooks";

const ArrowIndicator = forwardRef(
  ({ right = false, handleClick = () => {}, disabled = false }, ref) => {
    return (
      <Indicator ref={ref}>
        <IconButton onClick={handleClick} disabled={disabled}>
          {right ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Indicator>
    );
  }
);

function ImageAttributes({ form }) {
  const productId = form.watch("uuid");
  // console.log("🚀 ~ ImageAttributes ~ productId:", productId);
  const pointerRef = useRef(null);

  const {
    onChange,
    images,
    imageUrls,
    imageIndex,
    setImageIndex,
    handleDelete,
  } = useImage();

  // useEffect(() => {
  //   return () => {
  //     imageUrls.map((item) => URL.revokeObjectURL(item.url));
  //   };
  // }, [imageUrls]);

  return (
    <>
      <Wrapper className="first">
        <Title>Image Attributes</Title>
      </Wrapper>
      <Wrapper>
        <input
          type="file"
          name="upload"
          id="upload"
          multiple
          onChange={onChange}
        />
        <pre>
          {JSON.stringify(
            { ...imageUrls[imageIndex], url: undefined },
            null,
            2
          )}
        </pre>
        <ImageWrapper>
          <ArrowIndicator
            disabled={images?.length < 1}
            handleClick={() =>
              setImageIndex((prev) =>
                prev > 0 ? prev - 1 : images?.length - 1
              )
            }
          />
          <Frame>
            {imageUrls?.length > 0 ? (
              <>
                <PreviewImage src={imageUrls[imageIndex].url} />
                <Delete>
                  <IconButton onClick={() => handleDelete(imageIndex)}>
                    <DeleteIcon />
                  </IconButton>
                </Delete>
              </>
            ) : (
              <NoImageWrapper>
                <NoPreviewImageText>No Image Available</NoPreviewImageText>
              </NoImageWrapper>
            )}
          </Frame>
          <ArrowIndicator
            right
            handleClick={() =>
              setImageIndex((prev) =>
                prev < images?.length - 1 ? prev + 1 : 0
              )
            }
            disabled={images?.length < 1}
          />
        </ImageWrapper>
        <BottomImageWrapper>
          <ArrowIndicator
            handleClick={() =>
              pointerRef?.current?.scrollBy({
                left: -200,
                behavior: "smooth",
              })
            }
            disabled={images?.length < 1}
          />
          <FullWidthWrapper ref={pointerRef}>
            {(imageUrls ?? []).map((item, i) => (
              <SmallFrame key={i} onClick={() => setImageIndex(i)}>
                <Image src={item.url} key={i} />
                <div>{item.name}</div>
              </SmallFrame>
            ))}
          </FullWidthWrapper>
          <ArrowIndicator
            right
            handleClick={() => {
              pointerRef?.current?.scrollBy({
                left: 200,
                behavior: "smooth",
              });
            }}
            disabled={images?.length < 1}
          />
        </BottomImageWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 10px 10px 10px 0;
  width: 100%;
  :last-child {
    padding-bottom: 20px;
    border-bottom: 2px inset #ededed;
    margin-bottom: 200px;
  }
  &.first {
    border-bottom: 2px inset #ededed;
    margin: 20px 0;
  }
`;

const Title = styled.strong`
  font-size: 22px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const Frame = styled.div`
  background-color: aliceblue;
  width: 300px;
  height: 400px;
  border-radius: 6px;
`;
const Indicator = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
`;

const BottomImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  margin: 50px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SmallFrame = styled.div`
  width: 200px;
  height: 200px;
  margin-right: 20px;
  flex-shrink: 0;
  border-radius: 6px;
`;

const FullWidthWrapper = styled.div`
  width: 100%;
  height: 259px;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
`;

const Image = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 25px;
  cursor: pointer;
`;
const NoImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const PreviewImage = styled.img`
  height: 400px;
  width: 300px;
  border-radius: 25px;
  cursor: pointer;
`;
const NoPreviewImageText = styled.div`
  font-size: 22px;
  font-weight: 700;
`;
const Delete = styled.div`
  position: relative;
  right: -300px;
  bottom: 400px;
`;
export default ImageAttributes;
