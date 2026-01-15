// 导出 HTML 文件
function exportHTML() {
    const html = generateFinalHTML(formData);

    // 创建 Blob
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });

    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.name || '个人主页'}.html`;

    // 触发下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 释放 URL
    setTimeout(() => URL.revokeObjectURL(url), 100);
}

// 生成完整的独立 HTML
function generateFinalHTML(data) {
    const previewHTML = generatePreviewHTML(data);

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(data.name || '个人主页')}</title>
    <style>
        /* 设计系统变量 */
        :root {
            --bg-primary: #F8F9FA;
            --bg-card: #FFFFFF;
            --color-primary: #3B82F6;
            --color-primary-light: #93C5FD;
            --color-text: #1F2937;
            --color-text-dark: #111827;
            --color-text-muted: #6B7280;
            --color-border: #E5E7EB;
            --spacing-xs: 0.5rem;
            --spacing-sm: 0.75rem;
            --spacing-md: 1rem;
            --spacing-lg: 1.5rem;
            --spacing-xl: 2rem;
            --spacing-xxl: 3rem;
            --radius-sm: 0.375rem;
            --radius-md: 0.5rem;
            --radius-lg: 0.75rem;
            --radius-xl: 1rem;
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: var(--bg-primary);
            color: var(--color-text);
            line-height: 1.6;
            padding: var(--spacing-xxl);
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            background: var(--bg-card);
            padding: var(--spacing-xxl);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-md);
        }

        .preview-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: 0 auto var(--spacing-lg);
            display: block;
            object-fit: cover;
            border: 4px solid var(--color-primary-light);
        }

        .preview-name {
            font-size: 2rem;
            font-weight: 700;
            color: var(--color-text-dark);
            text-align: center;
            margin-bottom: var(--spacing-xs);
        }

        .preview-title {
            font-size: 1.2rem;
            color: var(--color-primary);
            text-align: center;
            margin-bottom: var(--spacing-lg);
        }

        .preview-bio {
            text-align: center;
            color: var(--color-text);
            margin-bottom: var(--spacing-xl);
            line-height: 1.8;
        }

        .preview-contacts {
            display: flex;
            gap: var(--spacing-md);
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: var(--spacing-xxl);
        }

        .preview-contact {
            padding: var(--spacing-xs) var(--spacing-md);
            background: var(--bg-primary);
            border-radius: var(--radius-md);
            color: var(--color-text);
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }

        .preview-contact:hover {
            background: var(--color-primary-light);
            color: white;
        }

        .preview-section {
            margin-bottom: var(--spacing-xxl);
        }

        .preview-section h3 {
            font-size: 1.5rem;
            color: var(--color-text-dark);
            margin-bottom: var(--spacing-lg);
            padding-bottom: var(--spacing-sm);
            border-bottom: 2px solid var(--color-primary);
        }

        .preview-entry {
            margin-bottom: var(--spacing-lg);
            padding: var(--spacing-lg);
            background: var(--bg-primary);
            border-radius: var(--radius-md);
            border-left: 3px solid var(--color-primary-light);
        }

        .preview-entry-header {
            margin-bottom: var(--spacing-sm);
        }

        .preview-entry-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--color-text-dark);
        }

        .preview-entry-subtitle {
            color: var(--color-text-muted);
            font-size: 0.95rem;
        }

        .preview-entry-period {
            color: var(--color-text-muted);
            font-size: 0.9rem;
            margin-bottom: var(--spacing-xs);
        }

        .preview-entry-description {
            color: var(--color-text);
            line-height: 1.7;
        }

        .preview-skills {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-md);
        }

        .preview-skill {
            padding: var(--spacing-sm) var(--spacing-md);
            background: var(--bg-primary);
            border-radius: var(--radius-md);
            border: 1px solid var(--color-border);
        }

        .preview-skill-name {
            font-weight: 500;
            color: var(--color-text-dark);
            margin-bottom: var(--spacing-xs);
        }

        .preview-skill-bar {
            width: 120px;
            height: 6px;
            background: var(--color-border);
            border-radius: 3px;
            overflow: hidden;
        }

        .preview-skill-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
        }

        .preview-awards {
            list-style: none;
        }

        .preview-award {
            padding: var(--spacing-md);
            background: var(--bg-primary);
            border-radius: var(--radius-md);
            margin-bottom: var(--spacing-md);
            border-left: 3px solid var(--color-primary-light);
        }

        @media (max-width: 768px) {
            body {
                padding: var(--spacing-md);
            }
            .container {
                padding: var(--spacing-lg);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        ${previewHTML}
    </div>
</body>
</html>`;
}
