# Next 맛보기 프로젝트

> 넥스트가 뭐길래 다들 넥스트를 사용하는 걸까..  
> 한번 맛보자

## 패키지 설치

```sh
yarn
```

## 개발 모드 실행

```sh
yarn dev
```

---

## 프로젝트 구조

### 1. public

- 고정적인 파일들을 넣는 디렉토리이다.
- vue 로 치면 `src/assets` 디렉토리라고 할 수 있다.
- 루트로 접근이 가능하다

### 2. package.json

- 스크립트 명령어들을 볼 수 있다
- vue 처럼 프로젝트 dependencies 등 기본 설정들을 볼 수 있다.

---

## SSR 이란?

- 서버가 데이터를 가져와서 그린다

### SSR 을 담당하는 함수

`getServerSideProps`

- 서버에서 props 를 가져와서 화면에 그려 줄 수 있다
- Nuxt 로 치면 asyncData 같은 느낌인 듯

## CSR 이란?

- 클라이언트가 데이터를 가져와서 그린다

### CSR 을 담당하는 함수

- 따로 없음
- React 에서 하는 방법으로 그대로 하면 된다

## SSG 란?

- 정적인 사이트를 생성한다. (데이터를 가져와서 그려둔다)

### SSG 를 담당하는 함수

- getStaticProps, (getStaticPaths)
- 빌드할 때 데이터를 fetch 한다

### SSR 이랑 뭐가 다를까?

- `yarn dev` 로 실행시키면 server 에서 로그가 찍힌다.
- SSR 이랑 비슷하다고 생각이 들지만, build 해서 start 시키면 다른 것을 알 수 있다.
- 빌드할 때 데이터를 가져오는 것이다.

### 언제 쓸까?

- 서버 렌더링을 하면 사용자가 접근할 때마다 data fetching 을 하기 때문에 부하가 걸릴 수도 있다.
- 정적인 페이지를 만들 때 쓴다.
- 정적인 글만 있는 블로그를 쓸 때 쓴다!

### SSG 의 두 가지 상황

- Page 의 내용물이 외부 데이터에 의존적인 상황
  - API 에 의존적인 상황
  - getStaticProps 를 가지고 해결 가능
- Page Paths 까지 외부 데이터에 의존적인 상황
  - getStaticPaths 를 가지고 해결 가능

## ISR 이란?

- (특정 주기로) 데이터를 가져와서 다시 그려둔다

### ISR 을 담당하는 함수

- **getStaticProps** with revalidate
- revalidate 에 넣은 값으로 초마다 data fetching 을 한다.

### 언제 쓸까?

- 특정 주기로 데이터를 업데이트 해야 할 때 사용한다.

---

## Layouts

- 여러 page 들의 공통 처리를 담당한다.
- page 가 아닌 컴포넌트이기 때문에 Server side render 가 안 된다.

### 여러개의 Layouts 를 활용하고 싶은 경우

Page.getLayout 에 getLayout 함수를 제공하면 된다.

## Image

- 최적화된 이미지 유틸

---

## Router

- Next.js 의 Router 는 file-system 기반이다
- pages/ 혹은 src/pages/ 기반으로 만들어진다
  - 둘 다 있을 경우에는 뭐가 우선순위일까?
  - pages 가 우선 순위이고, src 이내에 있는 pages 는 무시가 된다.
- Nuxt.js 와 똑같다...

## slug

- 파일 이름을 [] 로 묶어 주면 된다.
- Nuxt.js 에서의 \_key 와 같다고 생각하면 된다.
- `pages/category.[slug].js` => `/category/:slug`
- 우선 순위는 명시해놓은 값이다.
  - 예를 들어, `pages/[username]/info.js` 와 `pages/category/info.js` 가 있을 때,  
    ~/category/info 로 접속하면 [username]/info.js 페이지가 아닌 category/info.js 페이지로 접근한다.
- [...slug] 로 생성했을 경우, 무한으로 slug 를 만들 수 있다.
  - router.query 로 접근할 경우 해당 쿼리 값들이 배열로 넘어온다
- dynamic 한 slug 를 보냈을 경우, useRouter 를 통해서 router.query 로 접근이 가능하다.
  - Nuxt 에서는 router.params 로 접근이 가능했었던 데에 비해, 다른 것 같다.
- query 에도 slug 가 있다면 어떻게 될까?
  - page 안에 사용하는 [slug] 가 있다면, 요것이 우선시 된다.
  - 예: [username]/index.js apple?username=test 일 경우, username 에 apple 이 들어간다.
- query 에 같은 값이 두개가 들어온다면?
  - 두개가 같이 붙어서 온다.
  - 예: food=event&food=home 일 경우, router.query.food = eventhome
- slug 페이지지만 index 페이지가 없을 때에도 slug 페이지를 보여 주고 싶다면, [slug] 에 대괄호를 한 쌍 더 붙여주면 된다. [[slug]].js

## 페이지 이동

- router.push API 를 이용하여 페이지 이동을 할 수 있다. (Nuxt 와 동일)

## Shallow Routing

- getServerSideProps / getStaticProps 등을 다시 실행시키지 않고,  
  현재 상태를 잃지 않고 url 을 바꾸는 방법

### url 을 바꾸는 3가지 방식

- `location.replace('url')`: 로컬 state 유지 안 됨 (리렌더)
- `router.push(url)`: 로컬 state 유지 / data fetching 은 일어남
- `router.push(url, as, {shallow: true})`: 로컬 state 유지 / data fetching X
  - 동일한 페이지 내에서 shallow 사용 시에만 현재 상태를 잃지 않고 라우팅 이동할 수가 있는 것이다.
  - vue 에서는 당연하게 상태를 잃지 않게끔 해 주는데, Next 에서는 따로 옵션이 있는가 봉가...

---

### 추가 사항

- 절대 경로를 사용하고 싶으면, `jsconfig.json` 파일에 아래처럼 하면 된다

```json
{
  "compilerOptions": {
    "baseUrl": [base url 경로]
  }
}
```
