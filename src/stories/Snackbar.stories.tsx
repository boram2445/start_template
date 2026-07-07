import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '@/components/core/button/index';
import { Snackbar, snackbar } from '@/components/core/snackbar/index';

const meta: Meta<typeof Snackbar> = {
  title: 'UI/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '하단 일시 토스트 — 트리거는 sonner의 toast를 감싼 snackbar() 헬퍼를 사용하고, 앱 적용 시 providers.tsx의 기본 Toaster를 이 컴포넌트로 교체한다.\n\n어두운 둥근 컨테이너 + 흰 텍스트, 자동 소멸. 성공은 체크 아이콘이 붙는다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Snackbar />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Button variant="outlined" onClick={() => snackbar('루틴을 저장했어요')}>
      스낵바 띄우기
    </Button>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="outlined" onClick={() => snackbar('기본 메시지예요')}>
        기본
      </Button>
      <Button variant="outlined" onClick={() => snackbar.success('루틴을 저장했어요')}>
        성공
      </Button>
      <Button
        variant="outlined"
        onClick={() =>
          snackbar('루틴을 삭제했어요', {
            action: { label: '실행 취소', onClick: () => {} },
          })
        }
      >
        액션 포함
      </Button>
    </div>
  ),
};
