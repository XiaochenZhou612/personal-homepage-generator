// 数据存储
let formData = {
    name: '',
    title: '',
    bio: '',
    avatar: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    education: [],
    internship: [],
    research: [],
    skills: [],
    awards: []
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 绑定表单输入事件
    const form = document.getElementById('profileForm');
    form.addEventListener('input', updatePreview);
    
    // 头像上传处理
    document.getElementById('avatar').addEventListener('change', handleAvatarUpload);
    
    // 初始预览
    updatePreview();
});

// 处理头像上传
function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            formData.avatar = event.target.result;
            updatePreview();
        };
        reader.readAsDataURL(file);
    }
}

// 更新预览
function updatePreview() {
    // 获取基本信息
    formData.name = document.getElementById('name').value;
    formData.title = document.getElementById('title').value;
    formData.bio = document.getElementById('bio').value;
    formData.email = document.getElementById('email').value;
    formData.phone = document.getElementById('phone').value;
    formData.github = document.getElementById('github').value;
    formData.linkedin = document.getElementById('linkedin').value;
    
    // 生成预览 HTML
    const previewHTML = generatePreviewHTML(formData);
    document.getElementById('preview').innerHTML = previewHTML;
}

// 生成预览 HTML
function generatePreviewHTML(data) {
    let html = '';
    
    // 头像
    const avatarSrc = data.avatar || 'assets/placeholder.svg';
    html += `<img src="${avatarSrc}" alt="头像" class="preview-avatar">`;
    
    // 姓名和标题
    if (data.name) {
        html += `<h1 class="preview-name">${escapeHtml(data.name)}</h1>`;
    }
    if (data.title) {
        html += `<div class="preview-title">${escapeHtml(data.title)}</div>`;
    }
    
    // 个人简介
    if (data.bio) {
        html += `<p class="preview-bio">${escapeHtml(data.bio)}</p>`;
    }
    
    // 联系方式
    const contacts = [];
    if (data.email) contacts.push(`<a href="mailto:${data.email}" class="preview-contact">📧 ${escapeHtml(data.email)}</a>`);
    if (data.phone) contacts.push(`<a href="tel:${data.phone}" class="preview-contact">📞 ${escapeHtml(data.phone)}</a>`);
    if (data.github) contacts.push(`<a href="${data.github}" target="_blank" class="preview-contact">🔗 GitHub</a>`);
    if (data.linkedin) contacts.push(`<a href="${data.linkedin}" target="_blank" class="preview-contact">💼 LinkedIn</a>`);
    
    if (contacts.length > 0) {
        html += `<div class="preview-contacts">${contacts.join('')}</div>`;
    }
    
    // 教育经历
    if (data.education.length > 0) {
        html += `<div class="preview-section"><h3>🎓 教育经历</h3>`;
        data.education.forEach(edu => {
            html += `
                <div class="preview-entry">
                    <div class="preview-entry-header">
                        <div class="preview-entry-title">${escapeHtml(edu.school)}</div>
                        <div class="preview-entry-subtitle">${escapeHtml(edu.major)} - ${escapeHtml(edu.degree)}</div>
                    </div>
                    <div class="preview-entry-period">${escapeHtml(edu.period)}</div>
                </div>
            `;
        });
        html += `</div>`;
    }
    
    // 实习经历
    if (data.internship.length > 0) {
        html += `<div class="preview-section"><h3>💼 实习经历</h3>`;
        data.internship.forEach(intern => {
            html += `
                <div class="preview-entry">
                    <div class="preview-entry-header">
                        <div class="preview-entry-title">${escapeHtml(intern.company)}</div>
                        <div class="preview-entry-subtitle">${escapeHtml(intern.position)}</div>
                    </div>
                    <div class="preview-entry-period">${escapeHtml(intern.period)}</div>
                    ${intern.description ? `<div class="preview-entry-description">${escapeHtml(intern.description)}</div>` : ''}
                </div>
            `;
        });
        html += `</div>`;
    }
    
    // 科研经历
    if (data.research.length > 0) {
        html += `<div class="preview-section"><h3>🔬 科研经历</h3>`;
        data.research.forEach(res => {
            html += `
                <div class="preview-entry">
                    <div class="preview-entry-header">
                        <div class="preview-entry-title">${escapeHtml(res.project)}</div>
                        <div class="preview-entry-subtitle">${escapeHtml(res.role)}</div>
                    </div>
                    ${res.description ? `<div class="preview-entry-description">${escapeHtml(res.description)}</div>` : ''}
                </div>
            `;
        });
        html += `</div>`;
    }
    
    // 技能
    if (data.skills.length > 0) {
        html += `<div class="preview-section"><h3>🛠️ 技能</h3><div class="preview-skills">`;
        data.skills.forEach(skill => {
            html += `
                <div class="preview-skill">
                    <div class="preview-skill-name">${escapeHtml(skill.name)}</div>
                    <div class="preview-skill-bar">
                        <div class="preview-skill-fill" style="width: ${skill.level}%"></div>
                    </div>
                </div>
            `;
        });
        html += `</div></div>`;
    }
    
    // 奖项荣誉
    if (data.awards.length > 0) {
        html += `<div class="preview-section"><h3>🏆 奖项荣誉</h3><ul class="preview-awards">`;
        data.awards.forEach(award => {
            html += `<li class="preview-award">${escapeHtml(award.title)}</li>`;
        });
        html += `</ul></div>`;
    }
    
    return html;
}

// HTML 转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 添加教育经历
function addEducation() {
    const id = Date.now();
    const html = `
        <div class="entry-card" id="education-${id}">
            <button type="button" class="btn-remove" onclick="removeEntry('education-${id}', ${id}, 'education')">×</button>
            <div class="form-group">
                <label>学校</label>
                <input type="text" data-type="education" data-id="${id}" data-field="school" onchange="updateEntry(this)">
            </div>
            <div class="form-group">
                <label>专业</label>
                <input type="text" data-type="education" data-id="${id}" data-field="major" onchange="updateEntry(this)">
            </div>
            <div class="form-group">
                <label>学位</label>
                <input type="text" data-type="education" data-id="${id}" data-field="degree" onchange="updateEntry(this)">
            </div>
            <div class="form-group">
                <label>时间</label>
                <input type="text" data-type="education" data-id="${id}" data-field="period" placeholder="2020.09 - 2024.06" onchange="updateEntry(this)">
            </div>
        </div>
    `;
    
    document.getElementById('educationList').insertAdjacentHTML('beforeend', html);
    formData.education.push({id, school: '', major: '', degree: '', period: ''});
}

// 添加实习经历
function addInternship() {
    const id = Date.now();
    const html = `
        <div class="entry-card" id="internship-${id}">
            <button type="button" class="btn-remove" onclick="removeEntry('internship-${id}', ${id}, 'internship')">×</button>
            <div class="form-group">
                <label>公司</label>
                <input type="text" data-type="internship" data-id="${id}" data-field="company" onchange="updateEntry(this)">
            </div>
            <div class="form-group">
                <label>职位</label>
                <input type="text" data-type="internship" data-id="${id}" data-field="position" onchange="updateEntry(this)">
            </div>
            <div class="form-group">
                <label>时间</label>
                <input type="text" data-type="internship" data-id="${id}" data-field="period" placeholder="2023.06 - 2023.09" onchange="updateEntry(this)">
            </div>
            <div class="form-group">
                <label>描述</label>
                <textarea data-type="internship" data-id="${id}" data-field="description" rows="3" onchange="updateEntry(this)"></textarea>
            </div>
        </div>
    `;
    
    document.getElementById('internshipList').insertAdjacentHTML('beforeend', html);
    formData.internship.push({id, company: '', position: '', period: '', description: ''});
}

// 添加科研经历
function addResearch() {
    const id = Date.now();
    const html = `
        <div class="entry-card" id="research-${id}">
            <button type="button" class="btn-remove" onclick="removeEntry('research-${id}', ${id}, 'research')">×</button>
            <div class="form-group">
                <label>项目名称</label>
                <input type="text" data-type="research" data-id="${id}" data-field="project" onchange="updateEntry(this)">
            </div>
            <div class="form-group">
                <label>角色</label>
                <input type="text" data-type="research" data-id="${id}" data-field="role" onchange="updateEntry(this)">
            </div>
            <div class="form-group">
                <label>描述</label>
                <textarea data-type="research" data-id="${id}" data-field="description" rows="3" onchange="updateEntry(this)"></textarea>
            </div>
        </div>
    `;
    
    document.getElementById('researchList').insertAdjacentHTML('beforeend', html);
    formData.research.push({id, project: '', role: '', description: ''});
}

// 添加技能
function addSkill() {
    const id = Date.now();
    const html = `
        <div class="entry-card" id="skill-${id}">
            <button type="button" class="btn-remove" onclick="removeEntry('skill-${id}', ${id}, 'skills')">×</button>
            <div class="form-group">
                <label>技能名称</label>
                <input type="text" data-type="skills" data-id="${id}" data-field="name" onchange="updateEntry(this)">
            </div>
            <div class="form-group">
                <label>熟练度 (%)</label>
                <input type="number" min="0" max="100" data-type="skills" data-id="${id}" data-field="level" onchange="updateEntry(this)">
            </div>
        </div>
    `;
    
    document.getElementById('skillsList').insertAdjacentHTML('beforeend', html);
    formData.skills.push({id, name: '', level: 70});
}

// 添加奖项
function addAward() {
    const id = Date.now();
    const html = `
        <div class="entry-card" id="award-${id}">
            <button type="button" class="btn-remove" onclick="removeEntry('award-${id}', ${id}, 'awards')">×</button>
            <div class="form-group">
                <label>奖项名称</label>
                <input type="text" data-type="awards" data-id="${id}" data-field="title" onchange="updateEntry(this)">
            </div>
        </div>
    `;
    
    document.getElementById('awardsList').insertAdjacentHTML('beforeend', html);
    formData.awards.push({id, title: ''});
}

// 更新条目数据
function updateEntry(element) {
    const type = element.dataset.type;
    const id = parseInt(element.dataset.id);
    const field = element.dataset.field;
    const value = element.value;
    
    const entry = formData[type].find(item => item.id === id);
    if (entry) {
        entry[field] = value;
        updatePreview();
    }
}

// 删除条目
function removeEntry(elementId, id, type) {
    document.getElementById(elementId).remove();
    formData[type] = formData[type].filter(item => item.id !== id);
    updatePreview();
}
