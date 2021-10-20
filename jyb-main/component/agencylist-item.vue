<template>
	<div class="m-list_index-list">
		<navigator hover-class="none" class="_a m-list-item m-item-multi-pic">
			<div class="m-item-info flex-box">
				<div class="m-item-logo flex-box skeleton-radius"><img class="_img" mode="widthFix" /></div>
				<div class="flex-1">
					<span class="_span m-item-title ellipsis-1 skeleton-rect">济南新航道英语培训学校</span>
					<div class="m-item-msg flex-box ellipsis-1 skeleton-rect">
						<span class="_span m-item-msg-score">4.9分</span>
						<span class="_span m-item-msg-zz flex-1 ellipsis-1">
							<i class="_i">115条评价</i>
							<i class="_i">2356人咨询</i>
						</span>
						<span class="_span m-item-msg-distance">0.5km</span>
					</div>
				</div>
			</div>
			<ul class="m-item-feature clearfloat skeleton-rect">
				<li class="_li">免费试听</li>
				<li class="_li">可预约上门</li>
				<li class="_li">免费试听</li>
				<li class="_li">可预约上门</li>
			</ul>
			<ul class="m-item-photos flex-box clearfloat skeleton-rect">
				<li class="_li"><img class="_img" mode="widthFix" /></li>
				<li class="_li"><img class="_img" mode="widthFix" /></li>
				<li class="_li"><img class="_img" mode="widthFix" /></li>
			</ul>
			<div class="m-item-class flex-box skeleton-rect">
				<i class="_i">课</i>
				<span class="_span flex-1 ellipsis-1">雅思6.5分基础班，高中生雅思6分直达班，雅思入门...</span>
			</div>
			<div class="m-item-activity flex-box skeleton-rect">
				<i class="_i">惠</i>
				<span class="_span flex-1 ellipsis-1">2019年暑期报名就减999元，名额有限，先到先得。</span>
			</div>
		</navigator>
	</div>
</template>

<script>
</script>

<style lang="scss">
	.m-list-item { padding: 30upx 20upx; display: block; @include mt(20upx); @include bgc(#fff); @include bdr(8upx); }
	.m-item-info { align-items: flex-start; @include mb(16upx); }
	.m-item-logo { width: 100upx; height: 100upx; overflow: hidden; border: 2upx solid $line-1; @include bdr(50%); @include mr(20upx); }
	.m-item-logo ._img { width: 100upx; max-height: 100upx; }
	.m-item-title { display: block; color: $black-8; @include fs(30upx); @include lh(48upx); @include fw(); @include mb(12upx); }
	.m-item-msg { 
		color: $black-4; @include fs(24upx); @include lh(28upx); 
		._i{display: inline;}
	}
	.m-item-msg-score { color: $red-6; @include mr(12upx); }
	.m-item-msg-zz ._i + ._i {@include ml(12upx); }
	.m-item-msg-distance { @include fs(22upx); }
	.m-item-feature { @include mb(12upx); }
	.m-item-feature ._li { height: 36upx; float: left; color: $black-8; @include border-1px($line-2, all, 8upx); @include pl(8upx); @include pr(8upx); @include lh(36upx); @include fs(20upx); @include mb(8upx); @include mr(8upx); @include fw(lighter); }
	.m-item-evaluation { color: $black-8; @include mb(20upx); @include fs(22upx); @include lh(32upx); @include fw(lighter); }
	.m-item-evaluation ._img { width: 28upx; height: 28upx; @include mr(4upx); }
	.m-item-school { color: $black-8; @include mb(20upx); @include fs(22upx); @include lh(32upx); }
	.m-item-photos { @include mb(20upx); justify-content: space-between; }
	.m-item-photos ._li { 
		width: 210upx; height: 126upx; flex: 1; position: relative; overflow: hidden; @include bdr(8upx); 
		._img{
			width: 100%; height: 126upx;
		}
	}
	.m-item-photos ._li + ._li { @include ml(10upx); }
	.m-item-class { @include mb(10upx); }
	.m-item-class, .m-item-activity { color: $black-8; @include fs(24upx); @include lh(36upx); justify-content: flex-start; }
	.m-item-class ._i, .m-item-activity ._i { width: 32upx; height: 32upx; display: inline-block; text-align: center; color: #fff; @include bdr(4upx); @include lh(32upx); @include fs(20upx); @include mr(8upx); }
	.m-item-class ._i { @include bgc($green-6); }
	.m-item-activity ._i { @include bgc($yellow-6); }
	
</style>
