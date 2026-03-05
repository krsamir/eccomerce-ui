import styled from "@emotion/styled";
import { useCategories } from "@hooks";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;
const ParentItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
const Child = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const Title = styled.span`
  &.parent {
    font-size: 18px;
    font-weight: 700;
  }
  &.last {
    margin-left: 5px;
  }
`;
const ChildWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
`;

const Handler = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

function CategoriesComponent({ form }) {
  const { getStepsCategories, addCategoriesToMapper, categoryMapper } =
    useCategories({
      isSteps: true,
      productIdMapper: form.watch("uuid"),
    });

  const [categoriesMap, setCategoriesMap] = useState(new Map());

  useEffect(() => {
    if (categoryMapper?.length > 0) {
      const cMap = new Map();
      categoryMapper.map((val) => {
        cMap.set(val?.categoryId, val);
      });
      setCategoriesMap(cMap);
    }
  }, [categoryMapper]);

  const handleChange = async ({ event, item }) => {
    const checked = event.target.checked;
    try {
      const { data } = await addCategoriesToMapper({
        categoryId: item?.id,
        productId: form.watch("uuid"),
        action: checked,
      });
      setCategoriesMap((prev) => {
        const next = new Map(prev);
        if (checked) {
          next.set(item.id, item);
        } else {
          next.delete(item?.id);
        }
        return next;
      });
    } catch (error) {
      console.log("🚀 ~ handleChange ~ error:", error);
    }
  };

  return (
    <>
      <Wrapper className="first">
        <HeaderTitle>Categories Attributes</HeaderTitle>
      </Wrapper>

      <Container>
        <Handler></Handler>
        {(getStepsCategories ?? []).map((val) => (
          <ParentItem key={val?.id}>
            <Title className="parent">{val?.name}</Title>
            <Child>
              {(val.children ?? []).map((item) => {
                return (
                  <ChildWrapper key={item.id}>
                    <Flex>
                      <CheckBox
                        type="checkbox"
                        name="categories"
                        id="categories"
                        checked={categoriesMap.has(item.id)}
                        onChange={(e) => handleChange({ event: e, item })}
                      />
                      <Title className="last">{item.name}</Title>
                    </Flex>
                  </ChildWrapper>
                );
              })}
            </Child>
          </ParentItem>
        ))}
      </Container>
    </>
  );
}

const Wrapper = styled.div`
  padding: 20px 10px 20px 0;
  width: 100%;
  :last-child {
    padding-bottom: 20px;
    border-bottom: 2px inset #ededed;
  }
  &.first {
    border-bottom: 2px inset #ededed;
    margin: 20px 0;
  }
  &.item {
    border-bottom: 2px inset #ededed;
  }
`;

const HeaderTitle = styled.strong`
  font-size: 22px;
`;
export default CategoriesComponent;
