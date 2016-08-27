block('view-profile')(
    js()(function () {
        return {
            subscribers: this.ctx.userInfo.subscribers.length,
            userId: this.ctx.userInfo.id
        };
    })
);
