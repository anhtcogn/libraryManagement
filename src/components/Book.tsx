import { Button, Input, Select } from "antd";
import React, { useState } from "react";

const { TextArea } = Input;

export const Book = (props) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between gap-3">
            <BookField isEdit={isEdit} title="Tiêu đề" />
            <BookField isEdit={isEdit} title="Tác giả" />
          </div>
          <div>
            <label htmlFor="description">Mô tả về sách</label>
            <TextArea disabled={!isEdit} id="description" />
          </div>
          <div className="flex justify-between gap-3">
            <BookField isEdit={isEdit} title="Ngày phát hành" />
            <BookField isEdit={isEdit} title="Số trang" />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="category">Thể loại</label>
            <Select disabled={!isEdit} id="category" />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {!isEdit ? (
          <Button type="primary" onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              type="primary"
              onClick={() => {
                setIsEdit(false);
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setIsEdit(false);
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const BookField = (props) => {
  const { title, value, isEdit } = props;
  return (
    <div className="flex-1">
      <label htmlFor={title}>{title}</label>
      <Input disabled={!isEdit} id={title} defaultValue={value} />
    </div>
  );
};
