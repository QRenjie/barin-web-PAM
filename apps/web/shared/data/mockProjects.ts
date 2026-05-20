import type { ProjectAsset } from '@interfaces/ProjectAsset';

export const mockProjects: ProjectAsset[] = [
  {
    id: 1,
    name: '营销自动化平台',
    repoUrl: 'https://github.com/company/marketing-automation',
    testUrl: 'https://test-marketing.insight.cn',
    prodUrl: 'https://marketing.insight.cn',
    author: '陈雅琳',
    otherInfo: '⚙️ Next.js + NestJS · 多渠道触达 · 更新 2025-02',
    description: '全渠道营销自动化引擎，支持邮件/SMS/企微集成',
    tags: ['营销', '自动化']
  },
  {
    id: 2,
    name: '库存智能管理系统',
    repoUrl: 'https://github.com/company/inventory-master',
    testUrl: 'https://test-inventory.insight.cn',
    prodUrl: 'https://inventory.insight.cn',
    author: '张明远',
    otherInfo: '📦 Spring Boot + Redis + React · 实时预警 v3.1',
    description: '多仓实时库存追踪，预测补货与智能调拨',
    tags: ['库存', 'IoT']
  },
  {
    id: 3,
    name: '员工自助服务门户',
    repoUrl: 'https://github.com/company/hr-portal',
    testUrl: 'https://test-hr.insight.cn',
    prodUrl: 'https://hr.insight.cn',
    author: '李心怡',
    otherInfo: '👥 Vue3 + .NET 8 · 工资单/假期/审批流 · SSO',
    description: '一体化HR服务台，覆盖入职、考勤与福利申请',
    tags: ['HR', 'Vue']
  },
  {
    id: 4,
    name: 'API 网关与控制台',
    repoUrl: 'https://github.com/company/api-gateway-console',
    testUrl: 'https://test-gateway.insight.cn',
    prodUrl: 'https://gateway.insight.cn',
    author: '王旭东',
    otherInfo: '🌐 Go + Envoy + gRPC · 限流/鉴权/监控',
    description: '统一流量入口，服务治理与可视化路由管理',
    tags: ['网关', '云原生']
  },
  {
    id: 5,
    name: '数据分析平台 (BI)',
    repoUrl: 'https://github.com/company/bi-dashboard',
    testUrl: 'https://test-bi.insight.cn',
    prodUrl: 'https://bi.insight.cn',
    author: '周敏',
    otherInfo: '📊 Apache Superset + Python FastAPI · 自助报表',
    description: '企业级BI看板，连接数仓支持动态下钻',
    tags: ['BI', '大数据']
  },
  {
    id: 6,
    name: '项目协同工作台',
    repoUrl: 'https://github.com/company/team-collab',
    testUrl: 'https://test-collab.insight.cn',
    prodUrl: 'https://collab.insight.cn',
    author: '赵一航',
    otherInfo: '🤝 React + Node + MongoDB · 任务/Gantt · 飞书',
    description: '研发全生命周期协同，OKR与迭代追踪',
    tags: ['协作', '敏捷']
  }
];
