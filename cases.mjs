const rubrics = {
  lead: '独立主导软件产品从需求到上线。直接证据需覆盖需求决策、上线决策或交付责任，且本人对整体负责。仅参与部分环节算部分支持。',
  acceptance: '本人负责上线验收。能看出本人承担验收即支持，无需主导整个项目。',
  management: '直接管理至少 5 名团队成员。跨团队协调不计入直属管理，未提团队规模属于证据不足。',
  use: '本人负责的 AI 功能已在真实业务中投入使用。只做出原型算部分支持。明确没有上线且没有其他上线记录算明确不符。',
  workflow: '本人实际负责招聘工作流程，或为招聘业务设计并交付过工作流程。使用何种职位名称不影响判断。',
};

// Each pair stays together. Expected labels are never included in API requests.
const pairs = [
  ['dev', '01-责任范围', '判定随岗位要求变化', [
    ['lead', '参与招聘模块上线，负责验收测试。', '部分支持'],
    ['acceptance', '参与招聘模块上线，负责验收测试。', '支持'],
  ]],
  ['dev', '02-直属团队', '数字描述相近，人员关系不同', [
    ['management', '直属管理6名产品人员，负责绩效与人员安排。', '支持'],
    ['management', '协调6名项目成员推进交付，没有直属下属。', '明确不符'],
  ]],
  ['heldout', '03-措辞变化', '同样的职责换一种表达', [
    ['lead', '作为产品负责人独立主导访客系统从需求决策到发布交付。', '支持'],
    ['lead', '访客系统由我独立定需求、定发布范围，并对正式投产交付负责。', '支持'],
  ]],
  ['heldout', '04-只差一句', '区分缺少材料和明确反证', [
    ['management', '负责协调7位同事完成项目，管理供应商交付进度。', '证据不足'],
    ['management', '负责协调7位同事完成项目，管理供应商交付进度。没有直属下属。', '明确不符'],
  ]],
  ['heldout', '05-关键词干扰', '是否投产取决于正文描述', [
    ['use', '简历标题：AI Agent 商业化落地。本人负责搭建客服原型，仅供内部演示，项目未部署上线。', '明确不符'],
    ['use', '我做过一个客服助手样机，仍在论证阶段。', '部分支持'],
  ]],
  ['heldout', '06-职位名称', '相同职务内容不因头衔改变', [
    ['workflow', '招聘产品经理。负责设计面试排期与候选人跟进流程，并交付给招聘团队使用。', '支持'],
    ['workflow', '运营专员。负责设计面试排期与候选人跟进流程，并交付给招聘团队使用。', '支持'],
  ]],
  ['heldout', '07-岗位要求', '同一份材料在两项岗位要求下得出不同结论', [
    ['lead', '物流排班系统由另一位同事主导。我负责最终验收并签署验收单。', '部分支持'],
    ['acceptance', '物流排班系统由另一位同事主导。我负责最终验收并签署验收单。', '支持'],
  ]],
];

export const decisions = ['建议约聊', '需要补证', '暂缓'];
export const labels = ['支持', '部分支持', '证据不足', '明确不符'];
const decisionByLabel = ['建议约聊', '需要补证', '需要补证', '暂缓'];

export const cases = pairs.flatMap(([split, pair, purpose, examples]) =>
  examples.map(([rule, resume, label], index) => ({
    id: `${pair.slice(0, 2)}${index === 0 ? 'a' : 'b'}`,
    split, pair, purpose, requirement: rubrics[rule], resume,
    expected: { label, decision: decisionByLabel[labels.indexOf(label)] },
  })),
);
