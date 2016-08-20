block('input').mod('type', 'file').elem('control').attrs()(function() {
    return this.extend(applyNext(), { type : 'file' });
});
