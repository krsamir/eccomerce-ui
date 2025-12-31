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
const TextBox = ({ left = "", right = "" }) => (
  <tr>
    <Left>{left}: </Left>
    <Right>{right}</Right>
  </tr>
);

function ImageAttributes({ form }) {
  const productId = form.watch("uuid");
  // console.log("🚀 ~ ImageAttributes ~ productId:", productId);
  const pointerRef = useRef(null);

  const {
    onChange,
    mediaUrls,
    imageIndex,
    setImageIndex,
    handleDelete,
    setMediaUrls,
  } = useImage();

  // useEffect(() => {
  //   return () => {
  //     imageUrls.map((item) => URL.revokeObjectURL(item.url));
  //   };
  // }, [imageUrls]);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleDragging = () => {
    const items = [...mediaUrls];
    const draggedItemContent = items.splice(dragItem.current, 1)[0];
    items.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setMediaUrls(items.map((item, i) => ({ ...item, sequence: i + 1 })));
  };

  console.info(mediaUrls);

  return (
    <>
      <Wrapper className="first">
        <Title>Image Attributes</Title>
        <Upload htmlFor="file-upload">
          <FileInput
            type="file"
            name="upload"
            id="file-upload"
            multiple
            onChange={onChange}
          />
          Browse
        </Upload>
      </Wrapper>
      <Wrapper>
        <ImageWrapper>
          <ArrowIndicator
            disabled={mediaUrls?.length < 1}
            handleClick={() =>
              setImageIndex((prev) =>
                prev > 0 ? prev - 1 : mediaUrls?.length - 1
              )
            }
          />
          <Frame>
            {mediaUrls?.length > 0 ? (
              <>
                <PreviewImage src={mediaUrls?.[imageIndex]?.url} />
                <Delete>
                  <IconButton onClick={() => handleDelete(imageIndex)}>
                    <DeleteIcon />
                  </IconButton>
                </Delete>
              </>
            ) : (
              <NoImageWrapper>
                <NoPreviewImageText>No Preview Available</NoPreviewImageText>
              </NoImageWrapper>
            )}
          </Frame>
          <ArrowIndicator
            right
            handleClick={() =>
              setImageIndex((prev) =>
                prev < mediaUrls?.length - 1 ? prev + 1 : 0
              )
            }
            disabled={mediaUrls?.length < 1}
          />
          {mediaUrls?.length > 0 && (
            <MetaData>
              <Table>
                <tbody>
                  <TextBox left="Name" right={mediaUrls?.[imageIndex]?.name} />
                  <TextBox left="Type" right={mediaUrls?.[imageIndex]?.type} />
                  <TextBox
                    left="Size"
                    right={`${mediaUrls?.[imageIndex]?.mb} MB, ${mediaUrls?.[imageIndex]?.kb} KB`}
                  />
                </tbody>
              </Table>
            </MetaData>
          )}
        </ImageWrapper>
        <BottomImageWrapper>
          <ArrowIndicator
            handleClick={() =>
              pointerRef?.current?.scrollBy({
                left: -200,
                behavior: "smooth",
              })
            }
            disabled={mediaUrls?.length < 1}
          />
          <FullWidthWrapper ref={pointerRef}>
            {(mediaUrls ?? [])
              ?.sort((a, b) => a.sequence - b.sequence)
              ?.map((item, i) => (
                <SmallFrame
                  key={i}
                  onClick={() => setImageIndex(i)}
                  draggable
                  onDragEnd={handleDragging}
                  onDragStart={() => (dragItem.current = i)}
                  onDragEnter={() => (dragOverItem.current = i)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <UploadStatus>Pending Upload</UploadStatus>
                  <Image src={item.url} key={i} $isActive={i === imageIndex} />
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
            disabled={mediaUrls?.length < 1}
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
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Title = styled.strong`
  font-size: 22px;
  flex: 1;
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
  border: 4px solid ${(props) => (props.$isActive ? "red" : "#fff")};
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
const FileInput = styled.input`
  display: none;
`;
const Upload = styled.label`
  background-color: ${(props) => props.theme.p2};
  color: #fff;
  padding: 10px 40px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 18px;
  margin-right: 10px;
  cursor: pointer;
  text-transform: uppercase;
`;

const MetaData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 250px;
`;

const Left = styled.td`
  text-align: right;
  font-weight: 600;
  font-size: 18px;
`;
const Right = styled.td`
  font-size: 18px;
`;
const Table = styled.table`
  background-color: ${(props) => props.theme.p2};
  color: #fff;
  padding: 20px;
  border-radius: 6px;
  height: 200px;
  width: 300px;
`;
const UploadStatus = styled.span`
  position: relative;
  top: 32px;
  left: 50px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 4px;
  border-radius: 6px;
`;

export default ImageAttributes;
