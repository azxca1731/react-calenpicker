# Contributing

이 저장소에 기여할 때 먼저 문제를 통해 원하는 변경 사항을 논의하고,
이메일 또는 변경하기 전에이 저장소의 소유자와 다른 방법을 사용하십시오.

우리는 행동 강령을 가지고 있으므로, 프로젝트와의 모든 상호 작용을 따라 주시기 바랍니다.

본 프로젝트는 몇 가지의 설계이념이 있습니다.

1. 설계이념 - atomic design
   > ex)[양현석님의 리액트 프로젝트의 디렉토리 구조](https://medium.com/@FourwingsY/react-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%9D%98-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC-%EA%B5%AC%EC%A1%B0-bb183c0a426e)
2. css - BEM 방법론
   > ex)[스키머님의 css 방법론(1) - BEM](https://medium.com/witinweb/css-%EB%B0%A9%EB%B2%95%EB%A1%A0-1-bem-block-element-modifier-1c03034e65a1)
3. 적재적소의 프로바이더
   > 프로바이더는 각각 알맞은 정보만 가지고 있어야합니다. 예시로 자신과 상관없는 정보를 가지고 있을수는 없습니다.
4. 프레젠테이션 컴포넌트와 컨테이너 컴포넌트
   > 컴포넌트는 크게 두가지로 이루어집니다. 프레젠테이션 컴포넌트는 css 프로바이더 외에 어떠한 프로바이더와 연결되있어서는 안됩니다. 이는 높은 재사용성과 연관됩니다. 만약 정보를 처리하거나 하려면 컨테이너 컴포넌트로 감싸서 사용하시길 바랍니다.
5. 프로바이더의 역할
   > 프로바이더는 액션과 상태를 관리합니다. 이 프로바이더를 통해 글로벌하게 상태를 관리 할 수 있습니다. 이 프로바이더에서 나온 상태와 액션은 connector를 이용해 사용해주시면 됩니다.

## Pull Request Process

1. 본 프로젝트는 깃허브 프로젝트와 깃플로우(자료: [ihoneymon님의-자료](https://gist.github.com/ihoneymon/a28138ee5309c73e94f9))를 기반으로 진행이 됩니다.
2. 먼저 이슈나 프로젝트에 있는 TODO사항을 하겠다고 코멘트를 남겨두신 후에 이슈번호-기능명으로 feature를 만듭니다
3. ESlint에 나와있는 대로 코딩 컨벤션을 지키셔서 풀 리퀘스트를 요청하면 되십니다.
4. pull request는 무조건 develop으로 요청해주시기 바랍니다.
5. 요청을 한 뒤 본 레포지토리의 컨트리뷰터가 리뷰를 한 뒤 그에 따른 요구 및 수락을 기다리면 됩니다.

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or
  advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic
  address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at [INSERT EMAIL ADDRESS]. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/
