import { TitleModel } from './models/TitleModel';

const titles: TitleModel[] = [];

export const addTitle = (title: TitleModel): TitleModel => {
  titles.push(title);
  return title;
};

export const editTitle = ({ text, room }: TitleModel): TitleModel => {
  const title = titles.find((currentTitle) => currentTitle.room === room) as TitleModel;
  title.text = text;
  return title;
};

export const getTitle = (room: string): string | undefined => {
  const title = titles.find((currentTitle) => currentTitle.room === room);
  return title?.text;
};

export const checkTitle = (room: string): boolean => titles.some((currentTitle) => currentTitle.room === room);
