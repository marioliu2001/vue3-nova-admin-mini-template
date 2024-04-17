// .release-it.cjs 根目录下
module.exports = {
  // Release-it 插件配置
  plugins: {
    // Conventional Changelog 插件配置
    '@release-it/conventional-changelog': {
      // 指定变更日志的标题
      header: '# 变更日志',
      // 使用预设定义提交类型及对应的变更日志部分
      preset: {
        name: 'conventionalcommits',
        types: [
          { type: 'feat', section: '✨ Features | 新功能' },
          { type: 'fix', section: '🐛 Bug Fixes | Bug 修复' },
          { type: 'chore', section: '🎫 Chores | 其他更新' },
          { type: 'docs', section: '📝 Documentation | 文档' },
          { type: 'style', section: '💄 Styles | 风格' },
          { type: 'refactor', section: '♻ Code Refactoring | 代码重构' },
          { type: 'perf', section: '⚡ Performance Improvements | 性能优化' },
          { type: 'test', section: '✅ Tests | 测试' },
          { type: 'revert', section: '⏪ Reverts | 回退' },
          { type: 'build', section: '👷‍ Build System | 构建' },
          { type: 'ci', section: '🔧 Continuous Integration | CI 配置' },
          { type: 'config', section: '🔨 CONFIG | 配置' },
          { type: 'init', section: '🎉 Init | 初始化' },
          { type: 'update', section: '🚀 update | 构建/工程依赖/工具升级' },
          { type: 'tool', section: '🚀 tool | 工具升级' }
        ]
      },
      // 指定生成的变更日志文件名
      infile: 'CHANGELOG.md',
      // 是否忽略推荐的版本提升
      ignoreRecommendedBump: true,
      // 是否强制使用严格的语义化版本
      strictSemVer: true
    }
  },
  // Git 相关配置
  git: {
    // 指定提交信息模板
    commitMessage: 'chore: Release v${version}'
  },
  // GitHub 相关配置
  github: {
    // 是否创建 GitHub Release
    release: true,
    // 是否创建草稿状态的 Release
    draft: false
  },
  // NPM 相关配置
  npm: {
    // 是否发布到 NPM
    publish: false
  },
  // 钩子配置
  hooks: {
    // 提升版本后执行的钩子命令
    'after:bump': 'echo 更新版本成功'
  }
};
