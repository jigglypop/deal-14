# 코딩 컨벤션

## 1) HTML, CSS

### id, class

- `-`를 통해 공백을 구분한다
- `class`는 스타일을 서술한다



## 2) JS

### 문장의 종료

- 문장의 종료에는 세미콜론을 사용한다

- 함수, 클래스, 인터페이스의 종료에는 사용하지 않는다

  ```javascript
  // BAD
  class A {
    
  };
  
  // GOOD
  class B {
  
  }
  ```

### 명명 규칙

- 변수, 함수는 카멜 케이스를 사용한다

- 클래스는 파스칼 케이스를 사용한다

- 범용적인 대문자 약어는 대문자 그대로 사용한다

  ```javascript
  // BAD 
  const testUrl = '';
  
  // GOOD
  const testURL = '';
  ```

### 선언과 할당

- `var`가 아닌 `const`, `let`을 사용한다

- 변수 선언 시 할당한다

  ```javascript
  //  BAD 
  let a;
  a = 1;
  
  //  BAD 
  let a;
  
  // GOOD
  let a = 1;
  ```

  // GOOD let a = null;

  

### 배열과 객체

- 배열과 객체는 반드시 리터럴로 선언한다

  ```javascript
  //  BAD 
  const a = new Array();
  
  // GOOD
  const a = [];
  ```

- 객체의 프로퍼티가 1개인 경우에만 한 줄로 정의를 하며, 2개 이상일 경우에는 개행을 강제한다.

  ```javascript
  //  BAD 
  const a = { name: 'hello', age: 18};
  
  // GOOD
  const a = { key: '' };
  
  // GOOD
  const a = {
    name: 'hello',
    age: 18,
  };
  ```

- 객체 리터럴 정의 시 마지막 값의 뒤에 콤마를 붙인다

  ```javascript
  //  BAD 
  const a = {
    key :value
  };
  
  // GOOD
  const a = {
    key: value,
  };
  ```

- 객체 리터럴 정의 시 콜론 앞의 공백을 허용하지 않으며 콜론 뒤는 항상 공백을 강제한다

  ```javascript
  //  BAD 
  const a = {
    key :value,
  };
  
  // GOOD
  const a = {
    key: value,
  };
  ```

- 메서드 문법을 사용 시 메서드 사이에 개행을 추가한다

  ```javascript
  //  BAD 
  class A {
    methodA() {
  
    }
    methodB() {
  
    }
  }
  
  // GOOD
  class A {
    methodA() {
  
    }
  
    methodB() {
  
    }
  }
  ```

### 함수

- 함수 생성자를 사용하여 선언하지 않는다

  ```javascript
  // BAD - 함수 생성자 사용
  const doSomething = new Function('param1', 'param2', 'return param1 + param2;');
  
  // GOOD - 함수 선언식 사용
  function doSomething(param1, param2) {
    return param1 + param2;
  }
  
  // GOOD - 함수 표현식 사용
  const doSomething = function(param1, param2) {
    return param1 + param2;
  };
  ```

- 화살표 함수를 통해 선언한다

  ```javascript
  // BAD
  function doSomething() {
  
  }
  
  // GOOD
  const doSomething = () => {
  
  }
  ```

* 화살표 함수의 파라미터가 하나이면 괄호를 생략한다

  ```javascript
  // BAD
  const doSomething = (e) => {
  
  }
  
  // GOOD
  const doSomething = e => {
  
  }
  ```

  

- 암시적 반환을 활용한다. 단, 개행이 필요한 경우 사용하지 않는다

  ```javascript
  // BAD
  const doSomething = (e) => {
    return e + 1;
  }
  
  // GOOD
  const doSomething = e => e + 1;
  ```

### 비구조화 할당

- 객체의 프로퍼티에 접근할 때는 비구조화 할당을 사용한다. 단, 새로운 이름으로 할당할 경우는 제외한다

  ```javascript
  // BAD
  const a = {
    name: '',
    age: 18,
  };
  const name = a.name;
  const age = a.age;
  
  // GOOD
  const a = {
    name: '',
    age: 18,
  };
  const { name, age } = a;
  
  // GOOD
  const a = {
    name: '',
    age: 18,
  };
  
  const testName = a.name;
  const testAge = a.age;
  ```

### 블록 구문

- 한 줄짜리 블록일 경우 중괄호 `{ }`를 생략하지 않는다

  ```javascript
  // BAD
  if (true) 
    doSomething();
  
  // GOOD
  if (true) {
    doSomething();
  }
  ```

- switch-case 사용 시 첫번째 case문을 제외하고 case문 사용 이전에 개행한다

  ```javascript
  // BAD
  switch (param) {
    case 1:
      doSomething();
    case 2:
      doSomething();
    case 3:
      doSomething();
  }
  // GOOD
  switch (param) {
    case 1:
      doSomething();
  
    case 2:
      doSomething();
  
    case 3:
      doSomething();
  }
  ```

- switch-case의 각 구문은 `break`, `return` `throw` 중 한 개로 끝나며, default문이 없으면 `// no default`를 표시한다

  ```javascript
  // BAD
  switch (param) {
    case 1:
      doSomething();
  }
  // GOOD
  switch (param) {
    case 1:
      doSomething();
  
    // no default
  }
  ```

### 조건 확인하기

- `===`, `!==`과 같은 삼중 등호 연산자를 사용한다

  ```javascript
  // BAD
  if (a == true) {
  
  }
  
  // GOOD
  if (a === true) {
  
  }
  ```

### 반환하기

- `return`문 바로 위는 한 칸 비워 놓는다

### 주석

- 주석 표시는 전후로 공백을 넣는다

  ```javascript
  // BAD
  const a = 1;//comment
  
  //GOOD
  const a = 1; // comment
  ```

### 공백

- 키워드, 연산자와 다른 코드 사이에 공백이 있어야 한다

  ```javascript
  // BAD
  for(let i=0;i<10;i+=1) {
  
  }
  
  // GOOD
  for (let i = 0; i < 10; i += 1) {
  
  }
  ```

- 콤마 다음에 값이 올 경우 공백이 있어야 한다.

  ```javascript
  // BAD
  const arr = [1,2,3,4];
  
  // GOOD
  const arr = [1, 2, 3, 4];
  ```