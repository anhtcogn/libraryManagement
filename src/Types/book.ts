export interface IBook {
  id: number;
  title: string;
  author: string;
  category: Array<string>;
  description: string;
  image: File;
  publishDate: Date;
  pageNum: number;
}

export interface ILibrary {
  Books: Array<IBook>;
}

export const NewBook = (
  id = null,
  title = "Title",
  author = "Anhtcogn",
  category = [],
  description = "",
  image = null,
  publishDate = new Date(),
  pageNum = 0
): IBook => {
  return {
    id: id,
    title: title,
    author: author,
    category: category,
    description: description,
    image: image,
    publishDate: publishDate,
    pageNum: pageNum,
  };
};

export const NewLibrary = (_Books = []): ILibrary => {
  return {
    Books: _Books,
  };
};
