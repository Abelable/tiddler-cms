import { Tooltip, Upload } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { useOssConfig } from "service/common";
import { PlusOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import "assets/style/sortableUpload.css";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";

interface OssUploadProps extends React.ComponentProps<typeof Upload> {
  accept?: string;
  maxCount?: number;
  zoom?: number;
}
interface DragableUploadListItemProps {
  originNode: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  file: UploadFile;
  fileList: UploadFile[];
  moveRow: (dragIndex: any, hoverIndex: any) => void;
}

const type = "DragableUploadList";

export const OssUpload = ({
  accept,
  maxCount,
  zoom,
  ...props
}: OssUploadProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (!fileList.length && props.defaultFileList) {
      setFileList(props.defaultFileList);
    }
    if (props.fileList) {
      setFileList(props.fileList);
    }
  }, [fileList.length, props.defaultFileList, props.fileList]);

  const { data: ossConfig } = useOssConfig();
  const getExtraData = (file: any) => {
    return {
      key: file.key,
      OSSAccessKeyId: ossConfig?.accessId,
      policy: ossConfig?.policy,
      Signature: ossConfig?.signature,
    };
  };
  const beforeUpload = (file: any) => {
    const filename = Date.now() + file.name;
    file.key = ossConfig?.dir + filename;
    file.url = `${ossConfig?.host}/${ossConfig?.dir}${filename}`;
    if (accept === ".mp4") {
      file.thumbUrl = `${ossConfig?.host}/${ossConfig?.dir}${filename}?x-oss-process=video/snapshot,t_0`;
    }
    return file;
  };

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = fileList[dragIndex];
      const newFileList = update(fileList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      });
      setFileList(newFileList);
      props.onChange?.(newFileList as any);
    },
    [fileList, props]
  );

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    props.onChange?.(newFileList as any);
  };

  return (
    <div style={{ zoom: zoom || 1 }}>
      <DndProvider backend={HTML5Backend}>
        <Upload
          {...props}
          listType="picture-card"
          accept={accept || "image/*"}
          beforeUpload={beforeUpload}
          action={ossConfig?.host}
          data={getExtraData}
          fileList={fileList}
          onChange={handleChange}
          itemRender={(originNode, file, currFileList) => (
            <DragableUploadListItem
              originNode={originNode}
              file={file}
              fileList={currFileList}
              moveRow={moveRow}
            />
          )}
        >
          {maxCount &&
          ((props.fileList && props.fileList.length >= maxCount) ||
            (props.defaultFileList &&
              props.defaultFileList.length >= maxCount)) ? null : (
            <div>
              {accept === ".mp4" ? (
                <VideoCameraAddOutlined style={{ fontSize: "1.2em" }} />
              ) : (
                <PlusOutlined />
              )}
              <div style={{ marginTop: 8 }}>点击上传</div>
            </div>
          )}
        </Upload>
      </DndProvider>
    </div>
  );
};

const DragableUploadListItem = ({
  originNode,
  moveRow,
  file,
  fileList,
}: DragableUploadListItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const index = fileList.indexOf(file);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? " drop-over-downward" : " drop-over-upward",
      };
    },
    drop: (item: any) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  const errorNode = (
    <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>
  );
  return (
    <div
      ref={ref}
      className={`ant-upload-draggable-list-item ${
        isOver ? dropClassName : ""
      }`}
      style={{ cursor: "move", height: "100%" }}
    >
      {file.status === "error" ? errorNode : originNode}
    </div>
  );
};
