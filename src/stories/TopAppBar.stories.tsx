import { BellIcon, SearchIcon, SettingsIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Badge } from '@/components/core/badge/index';
import { IconButton } from '@/components/core/icon-button/index';
import { TopAppBar } from '@/components/core/top-app-bar/index';

const meta: Meta<typeof TopAppBar> = {
  title: 'UI/TopAppBar',
  component: TopAppBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '최소 52 높이의 상단 앱 바 — 흰 배경 위 BackButton + Title + 액션 슬롯(최대 3) 구조. 좁은 화면에서 타이틀이 말줄임되어 액션 넘침을 방지한다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '중앙 타이틀',
    },
    onBack: {
      control: false,
      description: '뒤로가기 콜백 — 지정 시 왼쪽에 버튼 표시',
    },
    actions: {
      control: false,
      description: '오른쪽 액션 슬롯 (IconButton 최대 3개)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '내 루틴',
  },
};

export const WithBack: Story = {
  args: {
    title: '루틴 상세',
    onBack: () => {},
  },
};

export const WithActions: Story = {
  render: () => (
    <TopAppBar
      title="내 루틴"
      onBack={() => {}}
      actions={
        <>
          <IconButton aria-label="검색">
            <SearchIcon />
          </IconButton>
          <Badge variant="dot">
            <IconButton aria-label="알림">
              <BellIcon />
            </IconButton>
          </Badge>
          <IconButton aria-label="설정">
            <SettingsIcon />
          </IconButton>
        </>
      }
    />
  ),
};

export const LongTitle: Story = {
  render: () => (
    <div className="w-80">
      <TopAppBar
        title="아주 아주 아주 아주 긴 페이지 타이틀이 들어가는 경우"
        onBack={() => {}}
        actions={
          <IconButton aria-label="검색">
            <SearchIcon />
          </IconButton>
        }
      />
    </div>
  ),
};
