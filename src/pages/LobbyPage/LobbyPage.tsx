import { Issues } from '../../components/Issues/Issues';
import { MembersList } from '../../components/MembersList/MembersList';
import { StartGame } from '../../components/StartGame/StartGame';
import { Title } from '../../components/Title/Title';
import './LobbyPage.scss';

const data = [
  { src: 'https://www.meme-arsenal.com/memes/732cac98dc1d07127952687091bf7005.jpg', name: 'Sung-Jin-Woo' },
  { src: 'https://www.meme-arsenal.com/memes/732cac98dc1d07127952687091bf7005.jpg', name: 'Sung-Jin-Woo' },
  { src: 'https://www.meme-arsenal.com/memes/732cac98dc1d07127952687091bf7005.jpg', name: 'Sung-Jin-Woo' },
  { src: 'https://www.meme-arsenal.com/memes/732cac98dc1d07127952687091bf7005.jpg', name: 'Sung-Jin-Woo' },
  { src: 'https://www.meme-arsenal.com/memes/732cac98dc1d07127952687091bf7005.jpg', name: 'Sung-Jin-Woo' },
  { src: 'https://www.meme-arsenal.com/memes/732cac98dc1d07127952687091bf7005.jpg', name: 'Sung-Jin-Woo' },
  { src: 'https://www.meme-arsenal.com/memes/732cac98dc1d07127952687091bf7005.jpg', name: 'Sung-Jin-Woo' },
  { src: 'https://www.meme-arsenal.com/memes/732cac98dc1d07127952687091bf7005.jpg', name: 'Sung-Jin-Woo' },
  { src: 'https://www.meme-arsenal.com/memes/732cac98dc1d07127952687091bf7005.jpg', name: 'Sung-Jin-Woo' },
  { src: 'https://www.meme-arsenal.com/memes/732cac98dc1d07127952687091bf7005.jpg', name: 'Sung-Jin-Woo' },
];

export const LobbyPage = (): JSX.Element => {
  return (
    <div className="lobby-page">
      <Title title="Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)" />
      <StartGame />
      <MembersList data={data} />
      <Issues />
    </div>
  );
};
