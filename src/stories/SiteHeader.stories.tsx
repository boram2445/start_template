import Link from 'next/link';

import { BellIcon, MenuIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Badge } from '@/components/core/badge/index';
import { Button } from '@/components/core/button/index';
import { IconButton } from '@/components/core/icon-button/index';
import { SiteHeader, SiteHeaderLink } from '@/components/core/site-header/index';

const meta: Meta<typeof SiteHeader> = {
  title: 'UI/SiteHeader',
  component: SiteHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '웹사이트용 GNB 헤더 — logo/nav/actions/mobileMenu 슬롯 구조. nav는 모바일에서 숨겨지고, 그 자리를 mobileMenu(햄버거 등)가 대신한다. 앱 화면 헤더는 TopAppBar를 사용한다.\n\nsticky, 흰 배경 + 하단 헤어라인, 데스크톱 h-64/모바일 h-52.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    logo: {
      control: false,
      description: '왼쪽 로고/브랜드 슬롯',
    },
    nav: {
      control: false,
      description: '가운데 내비게이션 (모바일 숨김)',
    },
    actions: {
      control: false,
      description: '오른쪽 액션 슬롯',
    },
    mobileMenu: {
      control: false,
      description: '모바일 전용 메뉴 트리거(햄버거 등) — 데스크톱(≥md)에서는 숨겨진다. 드로어·시트와 조합',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SiteHeader
      logo={<span className="text-lg font-bold text-fg-brand">routine</span>}
      nav={
        <>
          <SiteHeaderLink href="#" active>
            홈
          </SiteHeaderLink>
          {/* next/link 등 라우터 링크는 asChild로 렌더 */}
          <SiteHeaderLink asChild>
            <Link href="#">루틴</Link>
          </SiteHeaderLink>
          <SiteHeaderLink href="#">리포트</SiteHeaderLink>
        </>
      }
      actions={
        <>
          <Badge variant="dot">
            <IconButton aria-label="알림">
              <BellIcon />
            </IconButton>
          </Badge>
          <Button size="small">시작하기</Button>
        </>
      }
    />
  ),
};

export const MobileMenu: Story = {
  // md:hidden 슬롯이라 모바일 프레임에서만 보인다 — 데스크톱 캔버스에선 nav가 대신 노출
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <SiteHeader
      logo={<span className="text-lg font-bold text-fg-brand">routine</span>}
      nav={
        <>
          <SiteHeaderLink href="#" active>
            홈
          </SiteHeaderLink>
          <SiteHeaderLink href="#">루틴</SiteHeaderLink>
        </>
      }
      mobileMenu={
        <IconButton aria-label="메뉴 열기">
          <MenuIcon />
        </IconButton>
      }
    />
  ),
};

export const LogoOnly: Story = {
  render: () => (
    <SiteHeader
      logo={<span className="text-lg font-bold text-fg-brand">routine</span>}
      actions={
        <Button variant="outlined" size="small">
          로그인
        </Button>
      }
    />
  ),
};

export const WithPageBody: Story = {
  render: () => (
    <div className="min-h-64">
      <SiteHeader
        logo={<span className="text-lg font-bold text-fg-brand">routine</span>}
        nav={
          <>
            <SiteHeaderLink href="#" active>
              홈
            </SiteHeaderLink>
            <SiteHeaderLink href="#">루틴</SiteHeaderLink>
          </>
        }
        actions={<Button size="small">시작하기</Button>}
      />
      <main className="mx-auto max-w-screen-lg px-4 py-8">
        <p className="text-base text-fg-secondary">
          sticky 헤더 아래 페이지 본문 — 컨테이너 규칙(max-w-screen-lg + px-4)의 예시입니다.
        </p>
      </main>
    </div>
  ),
};
