- **Block** the **Create Branch** permission at the **repository root** 
```
tf git permission /deny:CreateBranch /group:[Global-RS]\Contributors /collection:https://dev.azure.com/BrightstarApps/ /teamproject:Global-RS /repository:Global-RS-FE1
```

- **Allow** the **Create Branch** permission under
  - **feature**
  - **bugfix**
  - **hotfix**
```
tf git permission /allow:CreateBranch /group:[Global-RS]\Contributors /collection:https://dev.azure.com/BrightstarApps/ /teamproject:Global-RS /repository:Global-RS-FE1 /branch:feature

tf git permission /allow:CreateBranch /group:[Global-RS]\Contributors /collection:https://dev.azure.com/BrightstarApps/ /teamproject:Global-RS /repository:Global-RS-FE1 /branch:bugfix

tf git permission /allow:CreateBranch /group:[Global-RS]\Contributors /collection:https://dev.azure.com/BrightstarApps/ /teamproject:Global-RS /repository:Global-RS-FE1 /branch:hotfix
```

- **Allow** the **Create Branch** permission under
  - **integration**
  - **release**
  - **environment**
```
tf git permission /allow:CreateBranch /group:[Global-RS]\Contributors /collection:https://dev.azure.com/BrightstarApps/ /teamproject:Global-RS /repository:Global-RS-FE1 /branch:integration

tf git permission /allow:CreateBranch /group:[Global-RS]\Contributors /collection:https://dev.azure.com/BrightstarApps/ /teamproject:Global-RS /repository:Global-RS-FE1 /branch:release

tf git permission /allow:CreateBranch /group:[Global-RS]\Contributors /collection:https://dev.azure.com/BrightstarApps/ /teamproject:Global-RS /repository:Global-RS-FE1 /branch:environment
```
