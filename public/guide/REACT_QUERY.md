# React Query(TanStack Query)  
  
## 커스텀훅의 문제점
`React Hooks` 또는 `Custom Hooks`,(함수들은) 어떤 값의 재사용이 아니라 `로직`의 재사용을 위한 것이다.  
만약 완전히 동일한 `Custom Hooks`을 서로 다른 `Component`에서 호출하면 동일한 값을, 상태를 가진다.  
이 `Custom Hooks`은 어떤 상태를 만들지 즉, 어떤 로직을 이용해서 어떤 데이터를 반환해 줄 것인지만 결정될뿐  
`Custom Hooks`은 상태를 `global`하게 재사용할 수 있게 해주는 로직은 없다.  
  

### 정리
1. `Custom Hooks`은 `cache`가 되지 않는다.
   * `Custom Hooks`에서 데이터를 받아오는 통신 로직이 있다면 `Hook`을 호출할때마다 새롭게 데이터를 받아올 것이다.
2. 네트워크 통신에 실패 했을때 `retry` 기능을 구현하는데 번거롭다.
