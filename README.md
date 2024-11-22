```
// 필수 컴포넌트 설치
$ npx shadcn@latest init

$ npx shadcn@latest add alert-dialog
$ npx shadcn@latest add button
$ npx shadcn@latest add popover
$ npx shadcn@latest add dialog
$ npx shadcn@latest add checkbox
$ npx shadcn@latest add card
$ npx shadcn@latest add input
$ npx shadcn@latest add progress
$ npx shadcn@latest add separator
$ npx shadcn@latest add skeleton
$ npx shadcn@latest add toast

$ npm i sass
$ npm i npm i @uiw/react-markdown-editor
$ npm install @supabase/supabase-js
$ npm install nanoid
```

-   App Router 기반 페이지 라우팅이 이루어지니 만큼 `app` 폴더 하위에는 페이지에 관련된 파일이 위치합니다.
-   `public` 폴더를 따로 생성하여 assets와 styles 폴더를 생성하였습니다.
    -   assets: 정적 자원을 관리합니다. (예: 이미지, 아이콘, 폰트 등)
    -   styles: CSS 파일을 관리합니다. 
-   `components` 폴더에서는 해당 프로젝트에서 Base UI되는 컴포넌트들이 설치되어 관리됩니다. ui 폴더 참고해주세요.
-   Supabase 연동을 위한 개인의 API_KEY와 BASE_URL은 `.env.local` 파일에서 관리되기 때문에 깃허브에 따로 업로드 되지 않습니다. Supabase 공식문서를 참고하세요.