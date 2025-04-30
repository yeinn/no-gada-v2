# NOGADA

> 반복적인 문서 작업을 자동화하는 미니멀 도구  
> 템플릿 Word(.docx) 파일 + 데이터(.csv, .xlsx) 파일 → 개별 문서 자동 생성

---

## 🚧 프로젝트 진행 상황 (기준일: 2025-04-30)

- [x] Vite + React + TypeScript + TailwindCSS 프로젝트 셋업
- [x] 폴더 구조 정리 및 컴포넌트 구조화
- [x] 템플릿 업로더 / 데이터 업로더 컴포넌트 개발 (공통 컴포넌트로 리팩터링)
- [x] CSV 파일 파싱 및 미리보기 기능 구현
- [x] 템플릿 변수 추출 (`{변수}` → `{%변수%}`로 개선)
- [x] 매핑 UI 개발 (자동 매핑 / 수동 드롭다운 / 초기화)
- [x] 매핑 UI 상단 헤더 및 디자인 개선
- [x] NOGADA 브랜드 타이틀 중앙 고정 스타일 적용
- [x] 템플릿 → 매핑 사이의 흐름 화살표 표시
- [x] docx 병합 생성 및 zip 다운로드 기능 구현 중 (`pizzip + docxtemplater + jszip`)
- [ ] 매핑 유효성 검사 및 "생성하기" 버튼 조건 처리
- [ ] 배포 (Vercel 예정)
- [ ] README / 스크린샷 / 샘플 파일 추가

---

## 주요 기능 (계획 및 구현)

- Word 템플릿(.docx) 내 `{%이름%}`, `{%전화번호%}` 등 변수 추출
- CSV/XLSX 데이터 파일 업로드 → 표 형태 미리보기 제공
- 템플릿 변수 ↔ 데이터 컬럼명 매핑 UI (자동 매핑 / 수동 지정)
- 템플릿 + 데이터 병합 → 각 행마다 개별 `.docx` 파일 생성
- ZIP 묶음으로 다운로드 제공
- 모든 작업은 브라우저 메모리 내에서 처리 (개인정보 저장 없음)

---

## 🗂️ 폴더 구조 예시

```
nogada/
  ├── public/
  ├── src/
  │    ├── components/          # UI 컴포넌트
  │    ├── lib/                 # 데이터 파싱 / 템플릿 처리 로직
  │    ├── pages/               # 라우팅 페이지
  │    └── main.tsx            # 엔트리 포인트
  ├── package.json
  ├── tailwind.config.js
  ├── postcss.config.js
  ├── vite.config.ts
  └── README.md
```

---

## 🧪 사용법 (개발 중)

1. Word 템플릿(.docx)에 `{%이름%}`, `{%전화번호%}` 등 변수 작성
2. 데이터 파일(.csv, .xlsx)에 매칭되는 컬럼을 포함시킴
3. 웹 페이지에서 두 파일 업로드
4. 변수와 컬럼 매핑 UI에서 연결 확인
5. "생성하기" 클릭 → ZIP으로 docx 파일 일괄 다운로드

---

## ⚙️ 기술 스택

- Frontend: `React`, `Vite`, `TypeScript`, `TailwindCSS`
- CSV 파싱: `papaparse`, `xlsx`
- 문서 병합: `docxtemplater`, `pizzip`
- 압축 및 다운로드: `jszip`, `file-saver`

---

## 📸 Screenshots

> (추후 업데이트 예정)

---

## 📁 Sample Files

> 예시 템플릿 및 데이터 샘플 파일도 함께 제공 예정

- [📄 sample_template.docx](./samples/sample_template.docx) *(예정)*
- [📊 sample_data.csv](./samples/sample_data.csv) *(예정)*

---

## 🔐 개인정보 보호

- 사용자의 파일은 절대 서버에 저장되지 않습니다.
- 모든 처리는 브라우저 메모리에서만 수행됩니다.
- 개인정보를 포함한 파일은 다운로드 후 브라우저에서 즉시 폐기됩니다.

---

> **본 프로젝트는 현재 개발 중이며, UI/기능/구조가 계속 업데이트될 예정입니다.**
